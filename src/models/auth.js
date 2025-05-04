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
}

export default new AuthModel();
