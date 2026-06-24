import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { TextInput } from "@/components/ui/text-input";
import { Movie } from "@/core/domain/movie.type";
import { movieService } from "@/services/movie-service";
import { Card } from "./ui/card";
import { LoadingSpinner } from "./loading-spinner";
import { Pagination } from "./ui/pagination";
import { SelectInput, SelectInputOptions } from "./ui/select-input";
import { ErrorMessage } from "./ui/error-message";

export default function ListView() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [yearFilter, setYearFilter] = useState("");
  const [winnerFilter, setWinnerFilter] = useState<
    string | number | readonly string[] | undefined
  >();
  const [appliedYear, setAppliedYear] = useState("");
  const [moviesError, setMoviesError] = useState<string>();

  const PAGE_SIZE = 15;
  const WINNER_OPTIONS: SelectInputOptions[] = [
    {
      value: undefined,
      label: "-",
    },
    {
      value: "true",
      label: "Sim",
    },
    {
      value: "false",
      label: "Não",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await movieService.getMovies(
          page,
          PAGE_SIZE,
          appliedYear,
          winnerFilter === "-" ? "" : winnerFilter,
        );
        setMoviesError("");
        setMovies(result.content);
        setTotalPages(result.totalPages);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any | string) {
        setMoviesError(error.message || error);
      }
    };

    loadData();
  }, [page, appliedYear, winnerFilter]);

  const submitYearFilter = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    setAppliedYear(yearFilter);
  };

  const onChangeWinnerInput = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPage(0);
      setWinnerFilter(event?.target.value);
    },
    [],
  );

  const columnMovies: Column<Movie>[] = [
    { header: "ID", accessorKey: "id" },
    {
      header: (
        <>
          <span>Ano</span>
          <TextInput
            placeholder="Digite o ano (pressione enter para pesquisar)"
            handleSubmit={submitYearFilter}
            setValue={setYearFilter}
            value={yearFilter}
          />
        </>
      ),
      accessorKey: "year",
    },
    { header: "Título", accessorKey: "title" },
    {
      header: (
        <>
          <span>Vencedor</span>
          <SelectInput
            onChange={onChangeWinnerInput}
            options={WINNER_OPTIONS}
            value={winnerFilter}
          />
        </>
      ),
      accessorKey: (row) => (row.winner ? "Sim" : "Não"),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card title="Lista de filmes">
        {moviesError ? (
          <ErrorMessage message={moviesError} />
        ) : movies ? (
          <>
            <DataTable columns={columnMovies} data={movies} />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(targetPage) => setPage(targetPage)}
            />
          </>
        ) : (
          <LoadingSpinner />
        )}
      </Card>
    </div>
  );
}
