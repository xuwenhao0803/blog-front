import React, { FC, Fragment, useEffect } from 'react';
import styles from './index.less';
import moment from 'moment';
import { connect } from 'dva';
import { Table, Button, Modal, notification } from 'antd';

const Index: FC<any> = props => {
  const {
    article: { articleDetailList },
    dispatch,
  } = props;
  useEffect(() => {
    dispatch({
      type: 'article/queryDetailList',
    });
  }, []);

  const onView = (record: { id: any }) => {
    window.open(`/detail/${record.id}`);
  };
  const onEdit = (record: { id: any }) => {
    props.history.push(`/articleEdit/${record.id}`);
  };
  const onDelete = (record: { id: any }) => {
    Modal.confirm({
      title: '确定删除吗',
      width: 520,
      onOk: () => {
        dispatch({
          type: 'article/deleteArticle',
          payload: {
            id: record.id,
          },
        }).then((res: { code: string; msg: any }) => {
          console.log(res);

          if (res.code === '0') {
            notification.success({
              placement: 'bottomRight',
              message: res.msg,
            });
            dispatch({
              type: 'article/queryDetailList',
            });
          }
        });
      },
    });
  };
  const columns = [
    {
      key: 'title',
      title: '标题',
      width: '150',
      align: 'center',
      dataIndex: 'title',
    },
    {
      key: 'datetime',
      title: '日期',
      width: '150',
      align: 'center',
      dataIndex: 'datetime',
      render: (val: moment.MomentInput) => (
        <span>{moment(val).format('YYYY-MM-DD')}</span>
      ),
    },
    {
      key: 'datatime',
      title: '操作',
      width: '150',
      align: 'center',
      dataIndex: 'datatime',
      render: (_: any, record: any) => (
        <Fragment>
          <Button type="primary" onClick={() => onView(record)}>
            查看
          </Button>
          <Button
            style={{ background: 'green' }}
            onClick={() => onEdit(record)}
          >
            编辑
          </Button>
          <Button
            style={{ background: 'red' }}
            onClick={() => onDelete(record)}
          >
            删除
          </Button>
        </Fragment>
      ),
    },
  ];

  return (
    <div className={styles.content}>
      <h2>文章列表</h2>
      <Button
        className={styles.btn}
        onClick={() => {
          props.history.push('/articleEdit');
        }}
        type="primary"
      >
        新增
      </Button>
      <Table dataSource={articleDetailList} columns={columns} />
    </div>
  );
};

function mapStateToProps(mapState: any) {
  const { article, loading } = mapState;
  return {
    article,
    queryListLoading: loading.effects['article/queryDetailList'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
