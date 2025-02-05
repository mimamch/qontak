export type PaginationProps = {
  limit: number;
  offset: number;
};

export type PaginationResponse = {
  limit: number;
  offset: number;
  total: number;
  cursor?: {
    next?: string | null;
    previous?: string | null;
  };
};
