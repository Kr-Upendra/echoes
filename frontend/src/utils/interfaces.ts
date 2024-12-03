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

export interface IVoiceNote {
  _id: string;
  title: string;
  description: string;
  voiceNote: string;
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
  date?: Date;
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface IJournalData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  mood: string;
  color: string;
  images: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

export interface IMemoryStat {
  totalMemories: number;
  favoriteMemories: number;
  totalCategories: number;
  memoriesCreatedInCurrentMonth: number;
}

export interface IJournalStat {
  totalJournals: number;
  totalImages: number;
  currentStreak: number;
  journalsCreatedInCurrentMonth: number;
}
