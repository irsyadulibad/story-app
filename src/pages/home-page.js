import '../css/home.css';

export default class HomePage {
  async render() {
    return `
      <section class="home-section">
        <h1 class="title">StoryShare</h1>
        <p class="description">Bagikan momenmu dengan foto, tuliskan story, dan tandai lokasi</p>

        <div class="auth-buttons">
          <a href="#/login" class="btn primary" aria-label="Masuk"><i class="ti ti-login-2"></i> Masuk</a>
          <a href="#/register" class="btn outline" aria-label="Daftar"><i class="ti ti-user-plus"></i>Daftar</a>
        </div>

        <div class="feature">
          <div class="feature-item">
            <i class="ti ti-camera"></i>
            <span>
              <h3>Bagikan Foto</h3>
              <p>Unggah foto-foto terbaikmu dan bagikan kepada teman-temanmu.</p>
            </span>
          </div>

          <div class="feature-item">
            <i class="ti ti-pencil"></i>
            <span>
              <h3>Tuliskan Story</h3>
              <p>Ceritakan kisah di balik foto-foto tersebut dengan tulisan yang menarik.</p>
            </span>
          </div>

          <div class="feature-item">
            <i class="ti ti-map-pin"></i>
            <span>
              <h3>Tandai Lokasi</h3>
              <p>Berikan informasi lokasi tempat di mana foto tersebut diambil.</p>
            </span>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    //
  }
}
