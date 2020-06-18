import axios from 'axios';
import { queryurl } from './config';
import Cookie from 'js-cookie';

export async function saveArticle(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .post(
      `${queryurl}/api/article/add`,
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
export async function saveCommnet(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .post(
      `${queryurl}/api/comment/add`,
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

export async function updateArticle(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .post(
      `${queryurl}/api/article/update`,
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

export async function deleteArticle(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .delete(`${queryurl}/api/article/delete/${params.id}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}

export async function queryList(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .get(`${queryurl}/api/article/list`, {
      headers: { Authorization: `bearer ${token}` },
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
export async function queryDetailList(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .get(`${queryurl}/api/article/detail`, {
      headers: { Authorization: `bearer ${token}` },
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
export async function queryDetailInfo(params: any) {
  let data;
  let token = Cookie.get('token');

  await axios
    .get(`${queryurl}/api/article/detail/${params.id}`, {
      headers: { Authorization: `bearer ${token}` },
    })
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
export async function getComments(params: any) {
  let data;

  await axios
    .get(`${queryurl}/api/comment/list?id=${params.article_id}`)
    .then(res => {
      data = res.data;
    })
    .catch(error => {
      return error;
    });
  return data;
}
