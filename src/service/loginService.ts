import axios from 'axios';
import { queryurl } from './config';
import Cookie from 'js-cookie';
export async function register(params: any) {
  let data;
  await axios
    .post(`${queryurl}/api/user/register`, {
      ...params,
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
export async function toLogin(params: any) {
  let data;
  await axios
    .post(`${queryurl}/api/user/login`, {
      ...params,
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
export async function getUserInfo(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .get(`${queryurl}/api/user/info`, {
      headers: { Authorization: `bearer ${token}` },
    })
    .then(res => {
      console.log(res);

      data = res.data;
    })
    .catch(error => {
      Cookie.remove('token');
      location.reload();
      data = error.response.data;
    });
  return data;
}
export async function updateInfo(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .post(
      `${queryurl}/api/user/updateUser`,
      {
        ...params,
      },
      {
        headers: { Authorization: `bearer ${token}` },
      },
    )
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
