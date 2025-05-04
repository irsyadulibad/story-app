import './css/global.css';
import './components/navbar';
import './components/toast';
import App from './app';

document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('#content');
  const navbar = document.querySelector('app-navbar');
  const app = new App({ content });

  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    navbar.render();
  });
});
