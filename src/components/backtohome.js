class BackToHome extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <a href="#" class="back-to-home">
        <i class="ti ti-arrow-left"></i>
        <span>Kembali ke Beranda</span>
      </a>
    `;
  }
}

customElements.define('back-to-home', BackToHome);
export default BackToHome;
