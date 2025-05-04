import FeedPage from './pages/feed';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

const routes = {
  '/': () => new HomePage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/feed': () => new FeedPage(),
};

export default routes;
