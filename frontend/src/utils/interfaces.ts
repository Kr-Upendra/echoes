export interface INote {
  _id: string;
  title: string;
  content: string;
  category: {
    id?: string;
    title: string;
    slug: string;
  };
  tags: string[];
  isFavorite: boolean;
}
