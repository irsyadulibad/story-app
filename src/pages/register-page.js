import '../css/auth.css';
import '../components/backtohome';
import AuthModel from '../models/auth-model';
import RegisterPresenter from '../presenters/register-presenter';
import { showToast } from '../utils';

export default class RegisterPage {
  #presenter;

  async render() {
    return `
    <section class="auth-section">
      <div class="card">
        <back-to-home></back-to-home>
        <h1 class="title">Daftar</h1>
        <p class="description">Bergabunglah dengan kami dan bagikan momenmu!</p>

        <form id="register-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" name="name" autofocus required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" class="btn primary full">Daftar</button>
        </form>

        <p class="auth-link">
          Sudah punya akun? <a href="#/login">Masuk di sini</a>
        </p>
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: AuthModel,
    });

    this.#initListener();
  }

  #initListener() {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);

      this.#presenter.register(
        formData.get('name'),
        formData.get('email'),
        formData.get('password')
      );
    });
  }

  showLoading() {
    const btn = document.querySelector('button[type="submit"]');
    btn.classList.add('loading');
  }

  hideLoading() {
    const btn = document.querySelector('button[type="submit"]');
    btn.classList.remove('loading');
  }

  onRegisterSuccess(toast = true) {
    if (toast) {
      showToast('Berhasil mendaftar, silahkan login!', 'success');
    }

    window.location.href = '#/login';
  }

  onRegisterError() {
    showToast('Gagal mendaftar, silahkan coba lagi!', 'danger');
  }
}
