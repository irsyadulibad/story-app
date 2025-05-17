import AuthModel from './auth-model';
import { apiUrl, reqHeaders } from '../utils';

class FeedDetailModel {
  static async getStoryDetail(id) {
    try {
      const response = await fetch(`${apiUrl}/stories/${id}`, {
        headers: {
          ...reqHeaders,
          Authorization: `Bearer ${AuthModel.getUser().token}`,
        },
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        throw new Error(responseJson.message);
      }
      return responseJson.story;
    } catch (error) {
      console.error('Error fetching story detail:', error);
      throw error;
    }
  }
}

export default FeedDetailModel;
