import '../css/auth.css';
import '../components/backtohome';
import AuthModel from '../models/auth-model';
import LoginPresenter from '../presenters/login-presenter';

export default class LoginPage {
  #presenter;
  #submitButton;

  async render() {
    return `
      <section class="auth-section">
        <div class="card">
          <back-to-home></back-to-home>
          <h1 class="title">Masuk</h1>
          <p class="description">Selamat datang kembali! Silakan masuk untuk melanjutkan.</p>
          <form id="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" class="btn primary full" id="submit-button">Masuk</button>
          </form>
          <p class="auth-link">
            Belum punya akun? <a href="#/register">Daftar di sini</a>
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: AuthModel,
    });

    this.#submitButton = document.getElementById('submit-button');
    this.#initListener();
  }

  #initListener() {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.#submitButton.classList.add('loading');

      const formData = new FormData(event.target);
      this.#presenter.login(formData.get('email'), formData.get('password'));
    });
  }

  showLoading() {
    this.#submitButton.classList.add('loading');
  }

  hideLoading() {
    this.#submitButton.classList.remove('loading');
  }
}
