import Cookie from 'js-cookie';
import { Redirect } from 'umi';
import React from 'react';
export default (props: { children: React.ReactNode; history: string[] }) => {
  const token = Cookie.get('token');
  if (token) {
    return <div>{props.children}</div>;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
};
