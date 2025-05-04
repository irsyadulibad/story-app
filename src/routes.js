import HomePage from './pages/home';
import RegisterPage from './pages/register';

const routes = {
  '/': () => new HomePage(),
  '/register': () => new RegisterPage(),
};

export default routes;
