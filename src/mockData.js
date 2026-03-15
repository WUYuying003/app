// Mock data for Pet-Pop UX Demo

export const petProfile = {
  name: 'Laoto',
  level: 12,
  xp: 458,
  xpMax: 1200,
  followers: '5.4W',
  contentCount: 156,
  track: '颜值赛道',
  bubble: '可以摸摸我吗～',
  platforms: [
    { name: '小红书', color: '#FF2442', emoji: '📕' },
    { name: '抖音', color: '#000', emoji: '🎵' },
    { name: 'Instagram', color: '#E1306C', emoji: '📸' },
  ],
};

export const shortcutCards = [
  { id: 'profile', label: '宝宝资料', icon: '📋', count: null, color: '#A78BFA' },
  { id: 'photo', label: '明星照相馆', icon: '📸', count: 156, color: '#F5B720', featured: true },
  { id: 'footprint', label: '宝宝足迹', icon: '🗺️', count: null, color: '#F9A8D4' },
];

export const moreFeatures = [
  { id: 'collab', label: '联名活动', icon: '🤝' },
  { id: 'fanclub', label: '粉丝团', icon: '💛' },
  { id: 'merch', label: '周边商城', icon: '🛍️' },
  { id: 'live', label: '直播助手', icon: '🎙️' },
  { id: 'analytics', label: '数据分析', icon: '📊' },
  { id: 'award', label: '荣誉榜', icon: '🏆' },
];

export const creationTools = [
  {
    id: 'ai-images',
    label: 'AI Images',
    sublabel: '生成宠物高清图',
    badge: 'New',
    badgeColor: '#10B981',
    gradient: ['#BFDBFE', '#93C5FD'],
    emoji: '🖼️',
  },
  {
    id: 'ai-videos',
    label: 'AI Videos',
    sublabel: '一键生成短视频',
    badge: '-20 Token',
    badgeColor: '#F59E0B',
    gradient: ['#FDE68A', '#FCA5A5'],
    emoji: '🎬',
  },
  {
    id: 'ai-emojis',
    label: 'AI Emojis',
    sublabel: '生成表情包系列',
    badge: 'New',
    badgeColor: '#10B981',
    gradient: ['#BBF7D0', '#6EE7B7'],
    emoji: '😄',
  },
  {
    id: 'ai-related',
    label: 'AI Related',
    sublabel: '周边商品生成',
    badge: '-10 Token',
    badgeColor: '#F59E0B',
    gradient: ['#FDE68A', '#F9A8D4'],
    emoji: '🎁',
  },
];

export const styleTemplates = [
  { id: 'royal', label: '皇家风', emoji: '👑', color: '#FEF3C7' },
  { id: 'cute', label: '萌系', emoji: '🌸', color: '#FCE7F3' },
  { id: 'cool', label: '酷帅', emoji: '😎', color: '#DBEAFE' },
  { id: 'fantasy', label: '梦幻', emoji: '✨', color: '#EDE9FE' },
];

export const squarePosts = [
  {
    id: 1,
    petName: 'Boba',
    owner: '@boba_cat',
    likes: 2341,
    track: '颜值',
    bgColor: '#FDE68A',
    emoji: '🐱',
    aspectRatio: 'tall',
  },
  {
    id: 2,
    petName: 'Mochi',
    owner: '@mochi_shiba',
    likes: 8820,
    track: '才艺',
    bgColor: '#BFDBFE',
    emoji: '🐕',
    aspectRatio: 'short',
  },
  {
    id: 3,
    petName: 'Dumpling',
    owner: '@dump_bunny',
    likes: 1563,
    track: '吃播',
    bgColor: '#BBF7D0',
    emoji: '🐰',
    aspectRatio: 'short',
  },
  {
    id: 4,
    petName: 'Coco',
    owner: '@coco_persian',
    likes: 5019,
    track: '颜值',
    bgColor: '#FDE68A',
    emoji: '🐈',
    aspectRatio: 'tall',
  },
  {
    id: 5,
    petName: 'Noodle',
    owner: '@noodle_corgi',
    likes: 3377,
    track: '才艺',
    bgColor: '#F9A8D4',
    emoji: '🐶',
    aspectRatio: 'short',
  },
  {
    id: 6,
    petName: 'Taro',
    owner: '@taro_hamster',
    likes: 991,
    track: '故事',
    bgColor: '#DDD6FE',
    emoji: '🐹',
    aspectRatio: 'tall',
  },
];

export const activities = [
  {
    id: 1,
    title: '宠物颜值大赛 · 春季赛',
    desc: '上传宠物最靓的照片，赢取 500 Token + 官方认证徽章',
    deadline: '2026-03-20 23:59',
    prize: '500 Token',
    joined: 2341,
    tag: '颜值赛道',
    tagColor: '#F59E0B',
  },
  {
    id: 2,
    title: '吃播挑战赛 · 第三期',
    desc: '拍下宠物最萌的进食瞬间，TOP10 可获精选推荐位',
    deadline: '2026-03-25 23:59',
    prize: '推荐位',
    joined: 1829,
    tag: '吃播赛道',
    tagColor: '#10B981',
  },
];

export const vipPlans = [
  {
    id: 'monthly',
    name: '月度会员',
    price: '¥29',
    period: '/ 月',
    features: [
      '每月 500 Token',
      'AI 生图 × 30次/月',
      'AI 视频 × 5次/月',
      '专属客服',
    ],
    highlight: false,
    cta: '立即订阅',
  },
  {
    id: 'annual',
    name: '年度会员',
    price: '¥199',
    period: '/ 年',
    badge: '省 ¥149',
    features: [
      '每月 1500 Token',
      'AI 生图 无限次',
      'AI 视频 × 30次/月',
      '专属运营顾问',
      '优先审核绿色通道',
    ],
    highlight: true,
    cta: '立即升级',
  },
];
