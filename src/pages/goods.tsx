import React, { Fragment, useEffect, FC } from 'react';
import { connect } from 'dva';

const Goods: FC<any> = props => {
  useEffect(() => {
    const { dispatch } = props;

    dispatch({ type: 'brand/queryList' });
  }, []);

  const {
    brand: { brandList },
  } = props;

  return (
    <Fragment>
      <div>你好</div>
      {brandList.map(
        (item: { id: string | number | undefined; name: React.ReactNode }) => (
          <ul>
            <li key={item.id}>{item.name}</li>
          </ul>
        ),
      )}
    </Fragment>
  );
};

function mapStateToProps({ brand, loading }) {
  return {
    brand,
    queryListLoading: loading.effects['brand/queryList'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Goods);
