import React, { useState, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { TextInput } from "@/components/ui/text-input";
import {
  IntervalWinnersResponse,
  Movie,
  Studio,
  Winner,
  WinnersInterval,
} from "@/core/domain/movie.type";
import { movieService } from "@/services/movie-service";
import { LoadingSpinner } from "./loading-spinner";
import { ErrorMessage } from "./ui/error-message";

export default function DashboardView() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [yearsWithMultipleWinners, setYearsWithMultipleWinners] =
    useState<Winner[]>();
  const [producersInterval, setProducersInterval] = useState<
    IntervalWinnersResponse | undefined
  >();
  const [studiosWinnerCount, setStudiosWinnerCount] = useState<
    Studio[] | undefined
  >();
  const [moviesByYear, setMoviesByYear] = useState<Movie[]>();
  const [dashboardsError, setDashboardsError] = useState<string>();
  const [moviesError, setMoviesError] = useState<string>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          yearsWithMultipleWinners,
          producersInterval,
          studiosWinnerCount,
        ] = await Promise.all([
          movieService.getYearsWithMultipleWinners(),
          movieService.getProducersInterval(),
          movieService.getStudios(),
        ]);
        setDashboardsError("");
        setYearsWithMultipleWinners(yearsWithMultipleWinners.years);
        setProducersInterval(producersInterval);
        setStudiosWinnerCount(studiosWinnerCount.studios);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any | string) {
        setDashboardsError(error.message || error);
      }
    };

    loadData();
  }, []);

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await movieService.getMovieByYear(searchValue);
      setMoviesByYear(result);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any | string) {
      setMoviesError(error.message || error);
    }
  };

  const columnWinners: Column<Winner>[] = [
    { header: "Ano", accessorKey: "year" },
    { header: "Quantidade de vitórias", accessorKey: "winnerCount" },
  ];

  const columnStudios: Column<Studio>[] = [
    { header: "Estúdio", accessorKey: "name" },
    { header: "Quantidade de vitórias", accessorKey: "winCount" },
  ];

  const columnMinMaxProducersInterval: Column<WinnersInterval>[] = [
    { header: "Produtora", accessorKey: "producer" },
    { header: "Intervalo", accessorKey: "interval" },
    { header: "Ano anterior", accessorKey: "previousWin" },
    { header: "Ano seguinte", accessorKey: "followingWin" },
  ];

  const columnMovieWinnersByYear: Column<Movie>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "Ano", accessorKey: "year" },
    { header: "Título", accessorKey: "title" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 lg:w-7/8">
      <Card title="Liste os anos com múltiplos vencedores">
        {dashboardsError ? (
          <ErrorMessage message={dashboardsError} />
        ) : yearsWithMultipleWinners ? (
          <DataTable columns={columnWinners} data={yearsWithMultipleWinners} />
        ) : (
          <LoadingSpinner />
        )}
      </Card>

      <Card title="Os 3 melhores estúdios com vencedores">
        {dashboardsError ? (
          <ErrorMessage message={dashboardsError} />
        ) : studiosWinnerCount ? (
          <DataTable
            columns={columnStudios}
            data={studiosWinnerCount.slice(0, 3)}
          />
        ) : (
          <LoadingSpinner />
        )}
      </Card>

      <Card title="Produtores com o maior e o menor intervalo entre vitórias">
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-branding-primary mb-2">
              Máximo
            </h3>
            {dashboardsError ? (
              <ErrorMessage message={dashboardsError} />
            ) : producersInterval ? (
              <DataTable
                columns={columnMinMaxProducersInterval}
                data={producersInterval.max}
              />
            ) : (
              <LoadingSpinner />
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-branding-primary mb-2">
              Mínimo
            </h3>
            {dashboardsError ? (
              <ErrorMessage message={dashboardsError} />
            ) : producersInterval ? (
              <DataTable
                columns={columnMinMaxProducersInterval}
                data={producersInterval.min}
              />
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </Card>

      <Card title="Liste os filmes vencedores por ano">
        <div className="space-y-4">
          <TextInput
            placeholder="Digite o ano (pressione enter para pesquisar)"
            handleSubmit={submit}
            setValue={setSearchValue}
            value={searchValue}
          />
          {moviesError ? (
            <span className="text-red-500/40 text-sm">{moviesError}</span>
          ) : moviesByYear ? (
            <DataTable columns={columnMovieWinnersByYear} data={moviesByYear} />
          ) : !moviesByYear ? (
            <p></p>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </Card>
    </div>
  );
}
