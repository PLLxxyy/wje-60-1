import { create } from 'zustand';
import type { Game, GameStore, GameStatus, SortField } from '../types/game';
import { loadGames, saveGames, generateId } from '../utils/storage';
import { mockGames } from '../utils/mockData';

const validateGame = (game: any): game is Game => {
  return (
    game &&
    typeof game.id === 'string' &&
    typeof game.name === 'string' &&
    typeof game.platform === 'string' &&
    typeof game.releaseYear === 'number' &&
    !isNaN(game.releaseYear) &&
    game.releaseYear >= 1970 &&
    game.releaseYear <= 2030 &&
    typeof game.publisher === 'string' &&
    typeof game.genre === 'string' &&
    typeof game.coverImage === 'string' &&
    ['none', 'playing', 'completed', 'wishlist'].includes(game.status) &&
    typeof game.romFileName === 'string' &&
    typeof game.createdAt === 'number' &&
    typeof game.updatedAt === 'number'
  );
};

const initialGames = (() => {
  const saved = loadGames();
  if (saved.length > 0) {
    const validGames = saved.filter(validateGame);
    if (validGames.length > 0) return validGames;
  }
  return mockGames;
})();

const computeFilteredGames = (games: Game[], filters: FilterState, sort: SortState): Game[] => {
  let result = [...games];

  if (filters.platform) {
    result = result.filter(g => g.platform === filters.platform);
  }
  if (filters.genre) {
    result = result.filter(g => g.genre === filters.genre);
  }
  if (filters.year) {
    result = result.filter(g => g.releaseYear === filters.year);
  }
  if (filters.status) {
    result = result.filter(g => g.status === filters.status);
  }
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    result = result.filter(g =>
      g.name.toLowerCase().includes(query) ||
      g.publisher.toLowerCase().includes(query) ||
      g.romFileName.toLowerCase().includes(query)
    );
  }

  const sortField = sort.field as SortField;
  result.sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name, 'zh-CN');
    } else if (sortField === 'releaseYear') {
      comparison = a.releaseYear - b.releaseYear;
    } else if (sortField === 'platform') {
      comparison = a.platform.localeCompare(b.platform);
    } else if (sortField === 'createdAt') {
      comparison = a.createdAt - b.createdAt;
    }
    return sort.order === 'asc' ? comparison : -comparison;
  });

  return result;
};

export const useGameStore = create<GameStore>((set, get) => ({
  games: initialGames,
  filteredGames: computeFilteredGames(initialGames, {
    platform: null,
    genre: null,
    year: null,
    searchQuery: '',
    status: null,
  }, { field: 'name', order: 'asc' }),
  filters: {
    platform: null,
    genre: null,
    year: null,
    searchQuery: '',
    status: null,
  },
  sort: {
    field: 'name',
    order: 'asc',
  },
  viewMode: 'grid',
  selectedGame: null,
  isModalOpen: false,

  addGame: (gameData) => {
    const now = Date.now();
    const releaseYear = Number(gameData.releaseYear);
    if (isNaN(releaseYear) || releaseYear < 1970 || releaseYear > 2030) {
      console.error('Invalid release year');
      return;
    }
    const newGame: Game = {
      ...gameData,
      releaseYear,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    if (!validateGame(newGame)) {
      console.error('Invalid game data');
      return;
    }
    const games = [...get().games, newGame];
    const filteredGames = computeFilteredGames(games, get().filters, get().sort);
    set({ games, filteredGames });
    saveGames(games);
  },

  updateGame: (id, updates) => {
    const games = get().games.map(g => {
      if (g.id === id) {
        const updated = { ...g, ...updates, updatedAt: Date.now() };
        if (updates.releaseYear !== undefined) {
          updated.releaseYear = Number(updates.releaseYear);
        }
        return validateGame(updated) ? updated : g;
      }
      return g;
    });
    const filteredGames = computeFilteredGames(games, get().filters, get().sort);
    set({ games, filteredGames });
    saveGames(games);
  },

  deleteGame: (id) => {
    const games = get().games.filter(g => g.id !== id);
    const filteredGames = computeFilteredGames(games, get().filters, get().sort);
    set({ games, filteredGames });
    saveGames(games);
  },

  setGameStatus: (id, status) => {
    get().updateGame(id, { status });
  },

  setFilters: (filters) => {
    const newFilters = { ...get().filters, ...filters };
    const filteredGames = computeFilteredGames(get().games, newFilters, get().sort);
    set({ filters: newFilters, filteredGames });
  },

  setSort: (sort) => {
    const newSort = { ...get().sort, ...sort };
    const filteredGames = computeFilteredGames(get().games, get().filters, newSort);
    set({ sort: newSort, filteredGames });
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  openModal: (game) => {
    set({
      selectedGame: game || null,
      isModalOpen: true,
    });
  },

  closeModal: () => {
    set({
      isModalOpen: false,
      selectedGame: null,
    });
  },

  get filteredGames() {
    const { games, filters, sort } = get();
    let result = [...games];

    if (filters.platform) {
      result = result.filter(g => g.platform === filters.platform);
    }
    if (filters.genre) {
      result = result.filter(g => g.genre === filters.genre);
    }
    if (filters.year) {
      result = result.filter(g => g.releaseYear === filters.year);
    }
    if (filters.status) {
      result = result.filter(g => g.status === filters.status);
    }
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(g =>
        g.name.toLowerCase().includes(query) ||
        g.publisher.toLowerCase().includes(query) ||
        g.romFileName.toLowerCase().includes(query)
      );
    }

    const sortField = sort.field as SortField;
    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name, 'zh-CN');
      } else if (sortField === 'releaseYear') {
        comparison = a.releaseYear - b.releaseYear;
      } else if (sortField === 'platform') {
        comparison = a.platform.localeCompare(b.platform);
      } else if (sortField === 'createdAt') {
        comparison = a.createdAt - b.createdAt;
      }
      return sort.order === 'asc' ? comparison : -comparison;
    });

    return result;
  },

  get stats() {
    const { games } = get();
    
    if (games.length === 0) {
      return {
        total: 0,
        byPlatform: {},
        byStatus: { none: 0, playing: 0, completed: 0, wishlist: 0 },
        oldestGame: null,
        newestGame: null,
      };
    }

    const byPlatform: Record<string, number> = {};
    const byStatus: Record<GameStatus, number> = { none: 0, playing: 0, completed: 0, wishlist: 0 };
    
    let oldestGame = games[0];
    let newestGame = games[0];

    for (const game of games) {
      byPlatform[game.platform] = (byPlatform[game.platform] || 0) + 1;
      byStatus[game.status]++;
      
      if (game.releaseYear < oldestGame.releaseYear) {
        oldestGame = game;
      }
      if (game.releaseYear > newestGame.releaseYear) {
        newestGame = game;
      }
    }

    return {
      total: games.length,
      byPlatform,
      byStatus,
      oldestGame,
      newestGame,
    };
  },
}));
