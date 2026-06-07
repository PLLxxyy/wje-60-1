import type { Game, Review } from '../types/game';
import { DEFAULT_COVER } from './constants';
import { generateId } from './storage';

function createMockReview(rating: number, content: string): Review {
  return {
    id: generateId(),
    rating,
    content,
    createdAt: Date.now() - Math.random() * 5000000000,
  };
}

function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

function createMockGame(
  name: string,
  platform: string,
  releaseYear: number,
  publisher: string,
  genre: string,
  status: Game['status'] = 'none',
  romFileName: string = '',
  reviews: Review[] = []
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
    rating: calculateAverageRating(reviews),
    reviews,
    createdAt: Date.now() - Math.random() * 10000000000,
    updatedAt: Date.now() - Math.random() * 1000000000,
  };
}

export const mockGames: Game[] = [
  createMockGame('超级马里奥兄弟', 'NES', 1985, 'Nintendo', '动作', 'completed', 'Super_Mario_Bros.nes', [
    createMockReview(5, '经典中的经典！每个关卡都设计得非常巧妙，至今玩起来依然乐趣无穷。'),
    createMockReview(5, '开创了平台跳跃游戏的黄金时代，马里奥大叔的冒险从这里开始。'),
    createMockReview(4, '音乐太洗脑了，通关后依然会哼唱主题曲。'),
  ]),
  createMockGame('塞尔达传说', 'NES', 1986, 'Nintendo', '冒险', 'playing', 'Legend_of_Zelda.nes', [
    createMockReview(5, '开放世界游戏的鼻祖，探索的乐趣无与伦比。'),
    createMockReview(4, '没有攻略真的会卡关，但那种解谜后的成就感太爽了！'),
  ]),
  createMockGame('魂斗罗', 'NES', 1987, 'Konami', '射击', 'completed', 'Contra.nes', [
    createMockReview(5, '上上下下左右左右BA，三十条命！童年回忆啊！'),
    createMockReview(5, '双人合作神作，和兄弟一起通关的日子太美好了。'),
    createMockReview(4, '难度爆表，但每一次进步都让人热血沸腾。'),
  ]),
  createMockGame('最终幻想', 'NES', 1987, 'Square', '角色扮演', 'none', 'Final_Fantasy.nes', [
    createMockReview(4, '回合制RPG的奠基之作，职业系统很有深度。'),
  ]),
  createMockGame('洛克人2', 'NES', 1988, 'Capcom', '动作', 'wishlist', 'Mega_Man_2.nes', [
    createMockReview(5, '音乐是系列巅峰！Boss顺序选择策略性满分。'),
  ]),
  createMockGame('忍者龙剑传', 'NES', 1988, 'Tecmo', '动作', 'none', 'Ninja_Gaiden.nes'),
  
  createMockGame('超级马里奥世界', 'SNES', 1990, 'Nintendo', '动作', 'completed', 'Super_Mario_World.smc', [
    createMockReview(5, '耀西太可爱了！关卡数量和质量都无可挑剔。'),
    createMockReview(4, '秘密出口多到数不清，重玩价值极高。'),
  ]),
  createMockGame('塞尔达传说：众神的三角力量', 'SNES', 1991, 'Nintendo', '冒险', 'playing', 'Link_to_the_Past.smc', [
    createMockReview(5, '系列巅峰之一，表世界里世界的设计堪称神来之笔。'),
  ]),
  createMockGame('最终幻想6', 'SNES', 1994, 'Square', '角色扮演', 'wishlist', 'Final_Fantasy_VI.smc', [
    createMockReview(5, '史上最伟大的JRPG之一，剧情和角色塑造完美。'),
    createMockReview(5, '蒂娜的主题曲太美了，歌剧那段至今无人超越。'),
  ]),
  createMockGame('超级银河战士', 'SNES', 1994, 'Nintendo', '动作', 'completed', 'Super_Metroid.smc', [
    createMockReview(5, '银河恶魔城类游戏的标杆，探索和战斗的完美结合。'),
  ]),
  createMockGame('时空之轮', 'SNES', 1995, 'Square', '角色扮演', 'none', 'Chrono_Trigger.smc', [
    createMockReview(5, '鸟山明+坂口博信+植松伸夫，梦幻组合的巅峰之作。'),
    createMockReview(4, '时间旅行的剧情设定太惊艳了，多结局也很良心。'),
  ]),
  
  createMockGame('超级马里奥64', 'N64', 1996, 'Nintendo', '动作', 'completed', 'Super_Mario_64.n64', [
    createMockReview(5, '3D平台游戏的教科书，自由度在当时简直不可思议。'),
    createMockReview(5, '马里奥第一次开口说话，感动得热泪盈眶。'),
  ]),
  createMockGame('塞尔达传说：时之笛', 'N64', 1998, 'Nintendo', '冒险', 'playing', 'Ocarina_of_Time.n64', [
    createMockReview(5, '有史以来最伟大的游戏，没有之一。时光之笛的旋律永远难忘。'),
    createMockReview(5, '水之神殿虽然难，但通关后成就感爆棚。'),
    createMockReview(5, '成年林克和幼年林克的转换设计太巧妙了。'),
  ]),
  createMockGame('黄金眼007', 'N64', 1997, 'Rare', '射击', 'none', 'Goldeneye_007.n64', [
    createMockReview(4, '多人对战太欢乐了，各种奇葩武器笑死我了。'),
  ]),
  createMockGame('马里奥赛车64', 'N64', 1996, 'Nintendo', '竞速', 'completed', 'Mario_Kart_64.n64', [
    createMockReview(5, '蓝色龟壳毁友情，但就是停不下来！'),
    createMockReview(4, '彩虹之路是永远的噩梦也是永远的经典。'),
  ]),
  
  createMockGame('最终幻想7', 'PlayStation', 1997, 'Square', '角色扮演', 'wishlist', 'Final_Fantasy_VII.iso', [
    createMockReview(5, '克劳德、蒂法、艾瑞丝...每个角色都深入人心。'),
    createMockReview(5, '萨菲罗斯是史上最帅反派！主题曲太燃了。'),
    createMockReview(4, 'CG过场在当时惊为天人，现在看依然震撼。'),
  ]),
  createMockGame('合金装备', 'PlayStation', 1998, 'Konami', '动作', 'playing', 'Metal_Gear_Solid.iso', [
    createMockReview(5, '小岛秀夫的鬼才之作，电影化叙事的巅峰。'),
    createMockReview(4, '心理螳螂那段简直神了，居然会读我的记忆卡！'),
  ]),
  createMockGame('生化危机2', 'PlayStation', 1998, 'Capcom', '冒险', 'none', 'Resident_Evil_2.iso', [
    createMockReview(5, '里昂和克莱尔的初次登场，浣熊市事件的开端。'),
    createMockReview(4, '第一次玩吓得手柄都扔了，但就是想继续玩。'),
  ]),
  createMockGame('古惑狼', 'PlayStation', 1996, 'Naughty Dog', '动作', 'completed', 'Crash_Bandicoot.iso', [
    createMockReview(4, '索尼的吉祥物，跳跃手感一流。'),
  ]),
  
  createMockGame('索尼克大冒险', 'Dreamcast', 1998, 'Sega', '动作', 'none', 'Sonic_Adventure.cdi'),
  createMockGame('灵魂能力', 'Dreamcast', 1999, 'Namco', '格斗', 'wishlist', 'Soul_Calibur.cdi', [
    createMockReview(5, '画面在当时简直是CG级别的，格斗系统也很有深度。'),
  ]),
  
  createMockGame('精灵宝可梦 红', 'Game Boy', 1996, 'Nintendo', '角色扮演', 'completed', 'Pokemon_Red.gb', [
    createMockReview(5, '就决定是你了！皮卡丘！童年的梦想从这里开始。'),
    createMockReview(5, '收集151只宝可梦是我小学时最大的目标。'),
    createMockReview(4, '和朋友联机交换宝可梦的时光太美好了。'),
  ]),
  createMockGame('塞尔达传说：梦见岛', 'Game Boy', 1993, 'Nintendo', '冒险', 'none', 'Links_Awakening.gb'),
  createMockGame('超级马里奥乐园', 'Game Boy', 1989, 'Nintendo', '动作', 'completed', 'Super_Mario_Land.gb'),
  
  createMockGame('精灵宝可梦 红宝石', 'Game Boy Advance', 2002, 'Nintendo', '角色扮演', 'playing', 'Pokemon_Ruby.gba', [
    createMockReview(4, '宝石世代，新的地区新的冒险，气象馆那段记忆犹新。'),
  ]),
  createMockGame('银河战士：融合', 'Game Boy Advance', 2002, 'Nintendo', '动作', 'none', 'Metroid_Fusion.gba'),
  
  createMockGame('半条命2', 'PC', 2004, 'Valve', '射击', 'completed', 'Half_Life_2.iso', [
    createMockReview(5, 'G胖不会数3，但半条命2是真的神作。重力枪太好玩了。'),
    createMockReview(5, '物理引擎在当时简直是黑科技。'),
  ]),
  createMockGame('星际争霸', 'PC', 1998, 'Blizzard', '策略', 'playing', 'StarCraft.iso', [
    createMockReview(5, '电子竞技的鼻祖，三族平衡堪称完美。'),
    createMockReview(4, 'Show me the money! 当年的秘籍背得滚瓜烂熟。'),
  ]),
  createMockGame('毁灭战士', 'PC', 1993, 'id Software', '射击', 'completed', 'Doom.wad', [
    createMockReview(5, 'FPS游戏的鼻祖，当时的画面震撼了全世界。'),
  ]),
  
  createMockGame('街头霸王2', 'Arcade', 1991, 'Capcom', '格斗', 'none', 'Street_Fighter_II.zip', [
    createMockReview(5, '豪油根！阿杜根！格斗游戏的代名词。'),
    createMockReview(4, '街机厅排队对战的日子，青春啊。'),
  ]),
  createMockGame('吃豆人', 'Arcade', 1980, 'Namco', '益智', 'completed', 'Pac_Man.zip', [
    createMockReview(4, '简单但令人上瘾，游戏史上的不朽经典。'),
  ]),
];
