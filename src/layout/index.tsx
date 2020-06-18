import React, { FC, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'dva';
import { HomeOutlined } from '@ant-design/icons';
import Cookie from 'js-cookie';

const { Header, Content, Footer } = Layout;

const Index: FC<any> = props => {
  const [defaultKeys, setDefaultkeys] = useState(['1']);
  const {
    login: { isLogin, token, username },
    dispatch,
  } = props;
  const handleSelect = ({ key }) => {
    if (key == 1) {
      props.history.push('/home');
    } else if (key == 3) {
      props.history.push('/login');
    } else if (key == 4) {
      props.history.push('/personal');
    } else if (key == 2) {
      props.history.push('/article');
    }
    setDefaultkeys([key]);
  };
  useEffect(() => {
    const token = Cookie.get('token');

    if (token) {
      dispatch({
        type: 'login/getUserInfo',
      });

      dispatch({
        type: 'login/updateState',
        payload: {
          isLogin: true,
        },
      });
      if (props.location.pathname === '/article') {
        setDefaultkeys(['2']);
      } else if (props.location.pathname === '/personal') {
        setDefaultkeys(['4']);
      }
    } else {
      props.history.push('/login');
      setDefaultkeys(['3']);
    }

    if (props.location.pathname === '/') {
      props.history.push('/home');
      setDefaultkeys(['1']);
    }
  }, []);
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <span style={{ color: '#F0FFFF' }}>博客网</span>
        <Menu
          theme="dark"
          style={{ float: 'right', marginRight: '200px' }}
          mode="horizontal"
          onSelect={handleSelect}
          selectedKeys={defaultKeys}
        >
          <Menu.Item key="1">
            <HomeOutlined />
            首页
          </Menu.Item>
          {isLogin ? <Menu.Item key="2">我的博客</Menu.Item> : null}
          {isLogin ? (
            <Menu.Item key="4">{username}</Menu.Item>
          ) : (
            <Menu.Item key="3">登录</Menu.Item>
          )}
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64, minHeight: '500px' }}
      >
        {props.children &&
          React.cloneElement(props.children, {
            setDefaultkeys,
          })}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by MONKEY D</Footer>
    </Layout>
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
export default connect(mapStateToProps, mapDispatchToProps)(Index);
