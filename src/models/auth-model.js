import { apiUrl, reqHeaders } from '../utils';

class AuthModel {
  async register(name, email, password) {
    const response = await (
      await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({ name, email, password }),
      })
    ).json();

    if (response.error)
      return {
        status: false,
        message: response.message,
      };

    return {
      status: true,
      message: response.message,
    };
  }

  async login(email, password) {
    const response = await (
      await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({ email, password }),
      })
    ).json();

    if (response.error)
      return {
        status: false,
        message: response.message,
      };

    this.setUser(response.loginResult);

    return {
      status: true,
      message: response.message,
    };
  }

  logout() {
    localStorage.removeItem('user');
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn() {
    return !!this.getUser().token;
  }
}

export default new AuthModel();
