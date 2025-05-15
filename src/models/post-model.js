import AuthModel from './auth-model';
import { apiUrl } from '../utils';

class PostModel {
  async createPost(data) {
    const { description, photo, lat, lon } = data;

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    formData.append('lat', lat.toString());
    formData.append('lon', lon.toString());

    const response = await fetch(`${apiUrl}/stories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AuthModel.getUser().token}`,
      },
      body: formData,
    });

    const res = await response.json();

    if (res.error)
      return {
        status: false,
        message: res.message,
      };

    return {
      status: true,
      message: res.message,
    };
  }
}

export default new PostModel();
