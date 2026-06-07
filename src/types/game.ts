export type GameStatus = 'none' | 'playing' | 'completed' | 'wishlist';
export type ViewMode = 'grid' | 'list' | 'timeline';
export type SortField = 'name' | 'releaseYear' | 'platform' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface Game {
  id: string;
  name: string;
  platform: string;
  releaseYear: number;
  publisher: string;
  genre: string;
  coverImage: string;
  status: GameStatus;
  romFileName: string;
  createdAt: number;
  updatedAt: number;
}

export interface FilterState {
  platform: string | null;
  genre: string | null;
  year: number | null;
  searchQuery: string;
  status: GameStatus | null;
}

export interface SortState {
  field: SortField;
  order: SortOrder;
}

export interface GameStore {
  games: Game[];
  filters: FilterState;
  sort: SortState;
  viewMode: ViewMode;
  selectedGame: Game | null;
  isModalOpen: boolean;
  
  addGame: (game: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGame: (id: string, updates: Partial<Game>) => void;
  deleteGame: (id: string) => void;
  setGameStatus: (id: string, status: GameStatus) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSort: (sort: Partial<SortState>) => void;
  setViewMode: (mode: ViewMode) => void;
  openModal: (game?: Game) => void;
  closeModal: () => void;
  
  filteredGames: Game[];
  stats: {
    total: number;
    byPlatform: Record<string, number>;
    byStatus: Record<GameStatus, number>;
    oldestGame: Game | null;
    newestGame: Game | null;
  };
}
