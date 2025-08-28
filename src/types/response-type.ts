type PaginationLinksResponse = {
  first: string;
  last: string;
  next?: string;
  prev?: string;
};

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

type PaginationMetaResponse = {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type ResponseWithPagination<D> = {
  data: D[];
  links: PaginationLinksResponse;
  meta: PaginationMetaResponse;
};
