export const queryurl = 'http://localhost:3000';
import axios from 'axios';
import Cookie from 'js-cookie';

export async function request(url: any, options: string, customOptions = {}) {
  let data;
  let token = Cookie.get('token');
  if (options === 'get') {
    await axios
      .get(`${queryurl}${url}`, {
        ...customOptions,
        headers: { Authorization: `bearer ${token}` },
      })
      .then(res => {
        data = res.data;
      })
      .catch(error => {
        return error;
      });
    return data;
  } else {
  }
}
