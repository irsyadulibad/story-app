export default class RegisterPage {
  async render() {
    return `
      <section class="register-section">
        <h1 class="title">Daftar</h1>
        <p class="description">Bergabunglah dengan kami dan bagikan momenmu!</p>

        <form id="register-form">
          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" class="btn primary">Daftar</button>
        </form>

        <p class="login-link">
          Sudah punya akun? <a href="#/login">Masuk di sini</a>
        </p>
      </section>
    `;
  }
}
