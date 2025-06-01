export const PRIVATE_ROUTES = {
  Home: '/home',
  AddMemoryGame: '/memory-game/add-game',
  AddMemoryGameScreen: '/memory-game/add-screen',
  AddMemoryGameLevel: '/memory-game/add-level',
};

export const PUBLIC_ROUTES = {
  LandingPage: '/',
  Login: '/login',
  SignUp: '/signup',
};

export const ROUTES = {
  ...PRIVATE_ROUTES,
  ...PUBLIC_ROUTES,
};


