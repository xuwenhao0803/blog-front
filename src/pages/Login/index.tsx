import React, { FC, useRef, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { connect } from 'dva';
import Register from './Register';
import styles from './index.less';

const Login: FC<any> = props => {
  const [form] = Form.useForm();
  const [regForm] = Form.useForm();
  const [register, setRegister] = useState(false);
  const { setDefaultkeys } = props;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const hanleSubmit = () => {
    const { login, dispatch, history, setDefaultkeys } = props;
    form
      .validateFields()
      .then((values: any) => {
        dispatch({
          type: 'login/toLogin',
          payload: {
            ...values,
          },
        }).then(res => {
          if (res.code === 0) {
            history.push('/home');
            setDefaultkeys(['1']);
            notification.success({
              placement: 'bottomRight',
              message: res.msg,
            });
            location.reload();
          } else {
            notification.error({
              placement: 'bottomRight',
              message: res.msg,
            });
          }
        });
      })
      .catch((err: any) => {});
  };

  const hanleRegister = () => {
    const { dispatch } = props;
    regForm
      .validateFields()
      .then((values: any) => {
        dispatch({
          type: 'login/register',
          payload: {
            ...values,
          },
        }).then((res: any) => {
          if (res) {
            if (res.code === 0) {
              notification.success({
                placement: 'bottomRight',
                message: res.msg,
              });
              setRegister(false);
            } else {
              notification.error({
                placement: 'bottomRight',
                message: res.msg,
              });
            }
          }
        });
      })
      .catch((err: any) => {});
  };
  const handleBack = () => {
    setRegister(false);
  };
  const hanleChange = () => {
    setRegister(true);
  };

  const handleCfmPwd = (rules, value, callback) => {
    let loginpass = regForm.getFieldValue('password');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  };
  const registerProps = {
    handleCfmPwd,
    handleBack,
    hanleRegister,
    regForm,
    layout,
  };
  return (
    <div className={styles.sign_box}>
      {!register ? (
        <Form className="login" form={form} {...layout}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ width: '100%' }}
              onClick={hanleSubmit}
            >
              登陆
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              className={styles.btn_sty}
              onClick={hanleChange}
            >
              注册新账号
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Register {...registerProps} />
      )}
    </div>
  );
};
function mapStateToProps({ login, loading }) {
  return {
    login,
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
