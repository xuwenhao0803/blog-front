import {
  register,
  toLogin,
  getUserInfo,
  updateInfo,
} from '../service/loginService';
import Cookie from 'js-cookie';

export default {
  namespace: 'login',
  state: {
    isLogin: false,
    imgUrl: '',
    username: '',
    token: '',
  },
  effects: {
    *register({ payload }, { call }) {
      const error: string = '';
      const result = yield call(register, payload);

      return result;
    },
    *exit({ payload }, { put }) {
      Cookie.remove('token');
      yield put({
        type: 'updateState',
        payload: {
          token: '',
          isLogin: false,
        },
      });
      return 1;
    },
    *getUserInfo({ payload }, { call, put }) {
      const result = yield call(getUserInfo, payload);
      console.log(result);
      if (result.code === '0') {
        yield put({
          type: 'updateState',
          payload: {
            username: result.data.name,
            imgUrl: result.data.head_img,
          },
        });
      }
    },
    *toLogin({ payload }, { call, put }) {
      const result = yield call(toLogin, payload);
      if (result.code === 0) {
        Cookie.set('token', result.token);
        yield put({
          type: 'updateState',
          payload: {
            token: result.token,
            isLogin: true,
          },
        });
      }

      return result;
    },
    *updateInfo({ payload }, { call, put }) {
      const result = yield call(updateInfo, payload);

      return result;
    },
  },
  reducers: {
    updateState(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
