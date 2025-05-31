import '../css/notfound.css';

export default class NotFoundPage {
  async render() {
    return `
      <section class="notfound-section">
        <h1 class="title">404</h1>
        <p class="description">Halaman tidak ditemukan</p>
        <a href="#/feed" class="btn primary">Kembali ke Beranda</a>
      </section>
    `;
  }

  async afterRender() {
    //
  }
}
