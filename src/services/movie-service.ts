import { apiClient } from "./api";
import {
  IntervalWinnersResponse,
  Movie,
  MoviesResponse,
  StudiosCountResponse,
  WinnersResponse,
} from "@/core/domain/movie.type";

export const movieService = {
  getMovies: async (
    page: number,
    size: number,
    year?: string,
    winner?: string | number | readonly string[] | undefined,
  ): Promise<MoviesResponse> => {
    const { data } = await apiClient.get("/movies", {
      params: {
        page,
        size,
        ...(winner !== undefined && { winner }),
        ...(year && { year }),
      },
    });
    return data;
  },

  getYearsWithMultipleWinners: async (): Promise<WinnersResponse> => {
    const { data } = await apiClient.get("/movies/yearsWithMultipleWinners");
    return data;
  },

  getStudios: async (): Promise<StudiosCountResponse> => {
    const { data } = await apiClient.get("/movies/studiosWithWinCount");
    return data;
  },

  getProducersInterval: async (): Promise<IntervalWinnersResponse> => {
    const { data } = await apiClient.get(
      "/movies/maxMinWinIntervalForProducers",
    );
    return data;
  },

  getMovieByYear: async (year: string): Promise<Movie[]> => {
    const { data } = await apiClient.get("/movies/winnersByYear", {
      params: { year },
    });
    return data;
  },
};
