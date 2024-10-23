export interface INote {
  noteId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  isFavorite: boolean;
}
