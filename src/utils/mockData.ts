import type { Game } from '../types/game';
import { DEFAULT_COVER } from './constants';
import { generateId } from './storage';

function createMockGame(
  name: string,
  platform: string,
  releaseYear: number,
  publisher: string,
  genre: string,
  status: Game['status'] = 'none',
  romFileName: string = ''
): Game {
  return {
    id: generateId(),
    name,
    platform,
    releaseYear,
    publisher,
    genre,
    coverImage: DEFAULT_COVER,
    status,
    romFileName: romFileName || `${name.replace(/\s+/g, '_')}.rom`,
    createdAt: Date.now() - Math.random() * 10000000000,
    updatedAt: Date.now() - Math.random() * 1000000000,
  };
}

export const mockGames: Game[] = [
  createMockGame('超级马里奥兄弟', 'NES', 1985, 'Nintendo', '动作', 'completed', 'Super_Mario_Bros.nes'),
  createMockGame('塞尔达传说', 'NES', 1986, 'Nintendo', '冒险', 'playing', 'Legend_of_Zelda.nes'),
  createMockGame('魂斗罗', 'NES', 1987, 'Konami', '射击', 'completed', 'Contra.nes'),
  createMockGame('最终幻想', 'NES', 1987, 'Square', '角色扮演', 'none', 'Final_Fantasy.nes'),
  createMockGame('洛克人2', 'NES', 1988, 'Capcom', '动作', 'wishlist', 'Mega_Man_2.nes'),
  createMockGame('忍者龙剑传', 'NES', 1988, 'Tecmo', '动作', 'none', 'Ninja_Gaiden.nes'),
  
  createMockGame('超级马里奥世界', 'SNES', 1990, 'Nintendo', '动作', 'completed', 'Super_Mario_World.smc'),
  createMockGame('塞尔达传说：众神的三角力量', 'SNES', 1991, 'Nintendo', '冒险', 'playing', 'Link_to_the_Past.smc'),
  createMockGame('最终幻想6', 'SNES', 1994, 'Square', '角色扮演', 'wishlist', 'Final_Fantasy_VI.smc'),
  createMockGame('超级银河战士', 'SNES', 1994, 'Nintendo', '动作', 'completed', 'Super_Metroid.smc'),
  createMockGame('时空之轮', 'SNES', 1995, 'Square', '角色扮演', 'none', 'Chrono_Trigger.smc'),
  
  createMockGame('超级马里奥64', 'N64', 1996, 'Nintendo', '动作', 'completed', 'Super_Mario_64.n64'),
  createMockGame('塞尔达传说：时之笛', 'N64', 1998, 'Nintendo', '冒险', 'playing', 'Ocarina_of_Time.n64'),
  createMockGame('黄金眼007', 'N64', 1997, 'Rare', '射击', 'none', 'Goldeneye_007.n64'),
  createMockGame('马里奥赛车64', 'N64', 1996, 'Nintendo', '竞速', 'completed', 'Mario_Kart_64.n64'),
  
  createMockGame('最终幻想7', 'PlayStation', 1997, 'Square', '角色扮演', 'wishlist', 'Final_Fantasy_VII.iso'),
  createMockGame('合金装备', 'PlayStation', 1998, 'Konami', '动作', 'playing', 'Metal_Gear_Solid.iso'),
  createMockGame('生化危机2', 'PlayStation', 1998, 'Capcom', '冒险', 'none', 'Resident_Evil_2.iso'),
  createMockGame('古惑狼', 'PlayStation', 1996, 'Naughty Dog', '动作', 'completed', 'Crash_Bandicoot.iso'),
  
  createMockGame('索尼克大冒险', 'Dreamcast', 1998, 'Sega', '动作', 'none', 'Sonic_Adventure.cdi'),
  createMockGame('灵魂能力', 'Dreamcast', 1999, 'Namco', '格斗', 'wishlist', 'Soul_Calibur.cdi'),
  
  createMockGame('精灵宝可梦 红', 'Game Boy', 1996, 'Nintendo', '角色扮演', 'completed', 'Pokemon_Red.gb'),
  createMockGame('塞尔达传说：梦见岛', 'Game Boy', 1993, 'Nintendo', '冒险', 'none', 'Links_Awakening.gb'),
  createMockGame('超级马里奥乐园', 'Game Boy', 1989, 'Nintendo', '动作', 'completed', 'Super_Mario_Land.gb'),
  
  createMockGame('精灵宝可梦 红宝石', 'Game Boy Advance', 2002, 'Nintendo', '角色扮演', 'playing', 'Pokemon_Ruby.gba'),
  createMockGame('银河战士：融合', 'Game Boy Advance', 2002, 'Nintendo', '动作', 'none', 'Metroid_Fusion.gba'),
  
  createMockGame('半条命2', 'PC', 2004, 'Valve', '射击', 'completed', 'Half_Life_2.iso'),
  createMockGame('星际争霸', 'PC', 1998, 'Blizzard', '策略', 'playing', 'StarCraft.iso'),
  createMockGame('毁灭战士', 'PC', 1993, 'id Software', '射击', 'completed', 'Doom.wad'),
  
  createMockGame('街头霸王2', 'Arcade', 1991, 'Capcom', '格斗', 'none', 'Street_Fighter_II.zip'),
  createMockGame('吃豆人', 'Arcade', 1980, 'Namco', '益智', 'completed', 'Pac_Man.zip'),
];
