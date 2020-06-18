import {
  saveArticle,
  queryList,
  queryDetailList,
  queryDetailInfo,
  updateArticle,
  saveCommnet,
  deleteArticle,
  getComments,
} from '../service/articleService';

export default {
  namespace: 'article',
  state: {
    isLogin: false,
    imgUrl: '',
    username: '',
    token: '',
    articleList: [],
    articleDetailList: [],
    commentList: [],
    detailInfo: {},
  },
  effects: {
    *saveArticle({ payload }, { call }) {
      const error: string = '';
      const result = yield call(saveArticle, payload);

      return result;
    },
    *updateArticle({ payload }, { call }) {
      const error: string = '';
      const result = yield call(updateArticle, payload);

      return result;
    },
    *deleteArticle({ payload }, { call }) {
      const error: string = '';
      const result = yield call(deleteArticle, payload);

      return result;
    },
    *queryList({ payload }, { call, put }) {
      const error: string = '';
      const result = yield call(queryList, payload);
      yield put({
        type: 'updateState',
        payload: {
          articleList: result.data,
        },
      });
      return result;
    },
    *queryDetailList({ payload }, { call, put }) {
      const error: string = '';
      const result = yield call(queryDetailList, payload);
      yield put({
        type: 'updateState',
        payload: {
          articleDetailList: result.data,
        },
      });
      return result;
    },
    *getComments({ payload }, { call, put }) {
      const error: string = '';
      const result = yield call(getComments, payload);
      yield put({
        type: 'updateState',
        payload: {
          commentList: result.data,
        },
      });
      return result;
    },
    *saveCommnet({ payload }, { call, put }) {
      const error: string = '';
      const result = yield call(saveCommnet, payload);
      yield put({
        type: 'updateState',
        payload: {
          articleDetailList: result.data,
        },
      });
      return result;
    },

    *queryDetailInfo({ payload }, { call, put }) {
      const error: string = '';
      const result = yield call(queryDetailInfo, payload);
      yield put({
        type: 'updateState',
        payload: {
          detailInfo: result.data,
        },
      });
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
