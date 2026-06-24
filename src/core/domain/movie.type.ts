export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MoviesResponse {
  content: Movie[];
  pageable: {
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface WinnersResponse {
  years: Winner[];
}

export interface Winner {
  year: number;
  winnerCount: number;
}

export interface StudiosCountResponse {
  studios: Studio[];
}

export interface Studio {
  name: string;
  winCount: number;
}

export interface IntervalWinnersResponse {
  min: WinnersInterval[];
  max: WinnersInterval[];
}

export interface WinnersInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
