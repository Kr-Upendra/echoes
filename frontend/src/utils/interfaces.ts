export interface INote {
  _id: string;
  title: string;
  content: string;
  category: {
    _id?: string;
    title: string;
    slug: string;
  };
  tags: string[];
  slug?: string;
  isFavorite: boolean;
  author?: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IFilterArgs {
  search?: string;
  page?: number;
  limit?: number;
  category?: string;
}
