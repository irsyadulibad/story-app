import AuthModel from './auth-model';
import { apiUrl, reqHeaders } from '../utils';

class FeedModel {
  async fetchData() {
    const response = await (
      await fetch(`${apiUrl}/stories`, {
        method: 'GET',
        headers: {
          ...reqHeaders,
          Authorization: `Bearer ${AuthModel.getUser().token}`,
        },
      })
    ).json();

    if (response.error)
      return {
        status: false,
        message: response.message,
      };

    return {
      status: true,
      data: response.listStory,
    };
  }
}

export default new FeedModel();
