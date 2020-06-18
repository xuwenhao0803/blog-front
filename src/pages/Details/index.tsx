import React, { Fragment, useEffect, FC } from 'react';
import { connect } from 'dva';
import { Form, notification } from 'antd';
import Message from './Message/index';
import { CoffeeOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import styles from './index.less';

const Index: FC<any> = props => {
  useEffect(() => {
    const { dispatch, match } = props;

    dispatch({
      type: 'article/queryDetailInfo',
      payload: {
        id: match.params.id,
      },
    });
    handleSerach();
  }, []);
  const { dispatch, match } = props;
  const [commentForm] = Form.useForm();
  const handleBack = () => {
    props.history.push('/home');
  };
  const submitCommit = () => {
    commentForm.validateFields().then((values: any) => {
      dispatch({
        type: 'article/saveCommnet',
        payload: {
          ...values,
          article_id: match.params.id,
        },
      }).then(res => {
        if (res.code === '0') {
          notification.success({
            placement: 'bottomRight',
            message: res.msg,
          });
          handleSerach();
          commentForm.resetFields();
        }
      });
    });
  };
  const handleSerach = () => {
    dispatch({
      type: 'article/getComments',
      payload: {
        article_id: match.params.id,
      },
    });
  };
  const {
    article: { detailInfo, commentList },
    setDefaultkeys,
  } = props;
  const commentProps = {
    submitCommit,
    setDefaultkeys,
    commentForm,
    commentList,
  };
  const htmlString = detailInfo.content;
  // 将HTML字符串转换为编辑器所需要的EditorState实例
  const editorState = BraftEditor.createEditorState(htmlString);
  return (
    <Fragment>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1 className="title">{detailInfo.title}</h1>
          <div className="time">
            <span className="date">
              <CoffeeOutlined />
              2020-01-20
            </span>
          </div>
        </div>
        <BraftEditor
          value={editorState}
          controlBarStyle={{ display: 'none' }}
          readOnly
          style={{ border: '1px solid #e8e8e8' }}
        />
        <Message {...commentProps} />
      </div>
    </Fragment>
  );
};

function mapStateToProps({ article, loading }) {
  return {
    article,
    queryListLoading: loading.effects['article/queryDetailInfo'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
