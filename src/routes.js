import FeedPage from './pages/feed-page';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';

const routes = {
  '/': () => new HomePage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/feed': () => new FeedPage(),
};

export default routes;
