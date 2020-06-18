import React, { FC, useRef, useState } from 'react';
import { Form, Input, Button } from 'antd';

const Register: FC<any> = props => {
  const { handleCfmPwd, handleBack, hanleRegister, regForm, layout } = props;
  return (
    <Form className="login" form={regForm} {...layout}>
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
      <Form.Item
        name="checkPassword"
        rules={[
          { required: true, message: '请输入密码' },
          {
            validator: (rules, value, callback) => {
              handleCfmPwd(rules, value, callback);
            },
          },
        ]}
        validateFirst
      >
        <Input.Password placeholder="再次输入密码" />
      </Form.Item>
      <Form.Item name="name" rules={[{ required: true, message: '昵称' }]}>
        <Input placeholder="昵称" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          style={{ width: '100%' }}
          onClick={hanleRegister}
        >
          注册
        </Button>
      </Form.Item>
      <Form.Item>
        <a onClick={handleBack}>返回登录</a>
      </Form.Item>
    </Form>
  );
};
export default Register;
