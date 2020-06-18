export default {
  namespace: 'brand',
  state: {
    brandList: [],
  },
  effects: {
    // 获取页面下拉列表显示值集

    *queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          brandList: [
            { name: '水果', id: 1 },
            { name: '电视', id: 2 },
          ],
        },
      });
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
