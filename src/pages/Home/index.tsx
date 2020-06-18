import React, { Fragment, useEffect, FC } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

const Index: FC<any> = props => {
  useEffect(() => {
    const { dispatch } = props;

    dispatch({ type: 'article/queryList' });
  }, []);

  const {
    article: { articleList },
  } = props;

  return (
    <Fragment>
      <div className={styles.content}>
        <div>
          {articleList &&
            articleList.map(item => {
              return (
                <div className={styles.homeList}>
                  <a
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      window.open(`/detail/${item.id}`);
                    }}
                  >
                    {item.title}
                  </a>
                  <div
                    style={{
                      fontSize: '26px',
                      marginTop: '10px',
                      marginLeft: '10px',
                    }}
                  >
                    {moment(item.create_date).format('YYYY-MM-DD')}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

function mapStateToProps({ article, loading }) {
  return {
    article,
    queryListLoading: loading.effects['article/queryList'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
