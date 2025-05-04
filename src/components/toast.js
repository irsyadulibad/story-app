class Toast extends HTMLElement {
  _message;

  constructor() {
    super();

    this._message = null;
    this.classList.add('toast');
    this.classList.add('animate__animated');
  }

  connectedCallback() {
    this._message = this.getAttribute('message');
    this.classList.add('animate__fadeInRight');

    if (this.getAttribute('variant'))
      this.classList.add(this.getAttribute('variant'));

    this.render();
  }

  render() {
    this.innerHTML = `
      <p>${this._message}</p>
    `;

    this._hide();
  }

  _hide() {
    setTimeout(() => {
      this.classList.add('animate__fadeOut');

      setTimeout(() => {
        this.remove();
      }, 1000);
    }, 2500);
  }
}

customElements.define('toast-message', Toast);
export default Toast;
