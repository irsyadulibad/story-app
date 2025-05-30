import BookmarkPage from './pages/bookmark-page';
import FeedDetailPage from './pages/feed-detail-page';
import FeedPage from './pages/feed-page';
import HomePage from './pages/home-page';
import LoginPage from './pages/login-page';
import PostPage from './pages/post-page';
import RegisterPage from './pages/register-page';

const routes = {
  '/': () => new HomePage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/feed': () => new FeedPage(),
  '/feed/:id': () => new FeedDetailPage(),
  '/post': () => new PostPage(),
  '/bookmarks': () => new BookmarkPage(),
};

export default routes;
