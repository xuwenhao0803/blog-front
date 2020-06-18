import React, { Fragment, useEffect, FC } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './index.less';

interface homeInterface {
  dispatch: any;
  article: { articleList: { [key: string]: any }[] };
}

const Index: FC<homeInterface> = props => {
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
                <div key={item.id} className={styles.homeList}>
                  <a
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      window.open(`/detail/${item.id}`);
                    }}
                  >
                    <span>{item.title}</span>
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

function mapStateToProps(mapState: any) {
  const { article, loading } = mapState;
  return {
    article,
    queryListLoading: loading.effects['article/queryList'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
