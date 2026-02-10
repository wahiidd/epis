export const COLORS = {
  RED_MAIN: '#A50606',
  RED_LIGHT: '#FF6B6B',
  YELLOW_MAIN: '#FFDC24',
  GREEN_MAIN: '#00625D',
  MINT_GREEN: '#A8FFD6',
  GREEN_LIGHT: '#56BF7C',
  BEIGE: '#F6F6E9',
  ORANGE: '#FF8C00',
  BLUE: '#2563EB',
  GRAY_DARK: '#2D2D2D',
  GRAY_LIGHT: '#CBDDD1'
};

export const SQUARE_COLORS = {
  easy: '#5FD89C',
  medium: '#F4C430',
  hard: '#C1272D',
  random: '#F5F1E8',
  risk: '#D97E2A',
  trap: '#5DADE2',
  start: '#1B4D45',
  end: '#F4C430'
};

export const SQUARE_TYPES = {
  EASY: { type: 'easy', count: 30, points: 1, time: 20 },
  MEDIUM: { type: 'medium', count: 30, points: 3, time: 20 },
  HARD: { type: 'hard', count: 30, points: 5, time: 20 },
  RANDOM: { type: 'random', count: 5, points: 5, time: 15 }
};

export const MOTIVATIONAL_MESSAGES = {
  10: "Bravo ! Tu as franchi le premier cap. Continue, la connaissance se construit pas à pas.",
  20: "Tu progresseras bien ! Chaque réponse correcte t'approche de la sagesse.",
  30: "Excellent ! Tu maîtrises les fondamentaux de l'épistémologie.",
  50: "Tu es en feu ! Ton expertise devient remarquable.",
  75: "Impressionnant ! Tu deviens un véritable expert.",
  100: "Tu as atteint le score ultime ! Tu démontres que la réflexion, la curiosité et la rigueur sont les meilleures cartes du jeu de la connaissance."
};

export const RANK_TITLES = {
  1: 'MAÎTRE DE L\'ÉPISTÉMOLOGIE',
  2: 'SAGE DE LA CONNAISSANCE',
  3: 'CURIEUX CRITIQUE'
};

export const FONTS = {
  TITLE: "'Kooperativ', serif",
  SUBTITLE: "'Roca One', serif",
  BODY: "'Caudex', serif"
};

export const TIMER_LIMITS = {
  easy: 15,
  medium: 20,
  hard: 25,
  random: 15
};

export const GAME_CONFIG = {
  BOARD_SIZE: 73,
  ANIMATION_DURATION: 0.6,
  DICE_MIN: 1,
  DICE_MAX: 6,
  SOLO_PLAYERS: 1,
  TEAM_PLAYERS: 4
};
