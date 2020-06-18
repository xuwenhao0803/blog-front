import React, { FC, useRef, useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Upload, notification } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { queryurl } from '@/service/config';

const Login: FC<any> = props => {
  const [form] = Form.useForm();
  const { login, dispatch } = props;
  const { imgUrl, username } = login;
  useEffect(() => {
    dispatch({
      type: 'login/getUserInfo',
    });
  }, []);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const hanleSubmit = () => {
    //修改用户信息
    form
      .validateFields()
      .then(values => {
        dispatch({
          type: 'login/updateInfo',
          payload: {
            ...values,
          },
        }).then((res: { code: string }) => {
          if (res.code === '0') {
            notification.success({
              placement: 'bottomRight',
              message: '修改成功',
            });
          }
        });
      })
      .catch((err: any) => {});
  };
  const hanleExit = () => {
    const { dispatch } = props;
    dispatch({
      type: 'login/exit',
    }).then((res: any) => {
      if (res) {
        props.history.push('/login');
        location.reload();
      }
    });
  };

  const uploadButton = (
    <div>
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const beforeUpload = () => {
    return true;
  };
  const handleChange = (info: any) => {
    if (info.file.status === 'done') {
      form.setFieldsValue({
        head_img: info.file.response.data,
      });
      dispatch({
        type: 'login/updateState',
        payload: {
          imgUrl: info.file.response.data,
        },
      });
    }
  };
  return (
    <div className={styles.person_box}>
      <Form className="login" form={form} {...layout}>
        <Form.Item
          name="name"
          label="昵称"
          initialValue={username}
          rules={[{ required: true, message: '请输入昵称' }]}
        >
          <Input placeholder="昵称" />
        </Form.Item>

        <Form.Item initialValue={imgUrl} name="head_img" label="头像">
          <Upload
            name="head_img"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${queryurl}/api/user/upload`}
            onChange={handleChange}
          >
            {imgUrl ? (
              <img src={imgUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <div className={styles.btn_group}>
          <Button
            type="primary"
            style={{ width: '100px', marginRight: '15px' }}
            onClick={hanleSubmit}
          >
            保存
          </Button>
          <Button type="default" style={{ width: '100px' }} onClick={hanleExit}>
            退出登录
          </Button>
        </div>
      </Form>
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
