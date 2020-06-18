import React, { Fragment, useEffect, FC } from 'react';
import { Form, Input, Button, Row, Col, List, Comment } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { history } from 'umi';

import { connect } from 'dva';
const { TextArea } = Input;
import styles from './index.less';

const Index: FC<any> = props => {
  useEffect(() => {
    const { dispatch } = props;

    dispatch({ type: 'brand/queryList' });
  }, []);

  const {
    login: { isLogin },
    setDefaultkeys,
    submitCommit,
    commentForm,
    commentList,
  } = props;

  return (
    <Fragment>
      <div className={styles.content}>
        {isLogin ? (
          <Fragment>
            <List
              className="comment-list"
              header={`2条评论`}
              itemLayout="horizontal"
              dataSource={commentList}
              renderItem={item => (
                <li>
                  <Comment
                    author={item.name}
                    avatar={<UserOutlined src={item.head_img} />}
                    content={item.cn_content}
                  />
                </li>
              )}
            />
            <Form form={commentForm} style={{ marginTop: '10px' }}>
              <Row>
                <Col span={18}>
                  <Form.Item label="发表评论" name="comments">
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item>
                    <Button
                      style={{
                        marginTop: '10px',
                        marginLeft: '10px',
                        borderRadius: '6px',
                      }}
                      onClick={submitCommit}
                      type="primary"
                    >
                      提交
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Fragment>
        ) : (
          <div className={styles.noLogin}>
            <a
              onClick={() => {
                setDefaultkeys(['3']);
                history.push('/login');
              }}
            >
              登陆留言吧
            </a>
          </div>
        )}
      </div>
    </Fragment>
  );
};

function mapStateToProps({ brand, loading, login }) {
  return {
    brand,
    login,
    queryListLoading: loading.effects['brand/queryList'],
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);
