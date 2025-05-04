import '../css/auth.css';
import '../components/backtohome';

export default class RegisterPage {
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
            <input type="text" id="name" autofocus required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required />
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
    //
  }
}
