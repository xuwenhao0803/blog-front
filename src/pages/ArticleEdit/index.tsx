import React, { Fragment, FC, useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { connect } from 'dva';
import BraftEditor from 'braft-editor';
import { ArrowLeftOutlined } from '@ant-design/icons';

const ArticleEdit: FC<any> = props => {
  const [form] = Form.useForm();
  const [editData, setEditData] = useState('');
  const { dispatch, match } = props;

  useEffect(() => {
    const { id } = match.params;
    if (id) {
      dispatch({
        type: 'article/queryDetailInfo',
        payload: {
          id,
        },
      });
    } else {
      dispatch({
        type: 'article/updateState',
        payload: {
          detailInfo: {},
        },
      });
    }
  }, []);

  const handleFinsh = (values: any) => {
    console.log(values);
  };
  const handleChange = (data: React.SetStateAction<string>) => {
    setEditData(data);
  };
  const hanleSave = () => {
    const { id } = match.params;
    form.validateFields().then((values: any) => {
      if (!id) {
        dispatch({
          type: 'article/saveArticle',
          payload: {
            ...values,
            details: values.details.toHTML(),
          },
        }).then((res: { code: string; msg: string }) => {
          if (res.code === '0') {
            notification.success({
              placement: 'bottomRight',
              message: res.msg,
            });
            props.history.push('/article');
          }
        });
      } else {
        dispatch({
          type: 'article/updateArticle',
          payload: {
            ...values,
            id,
            details: values.details.toHTML(),
          },
        }).then((res: { code: string; msg: string }) => {
          if (res.code === '0') {
            notification.success({
              placement: 'bottomRight',
              message: res.msg,
            });
            props.history.push('/article');
          }
        });
      }
    });
  };

  const {
    article: { detailInfo = {} },
  } = props;
  const handleBack = () => {
    dispatch({
      type: 'article/updateState',
      payload: {
        detailInfo: {},
      },
    });
    props.history.push('/article');
  };
  debugger;
  const htmlString = detailInfo.content;
  // 将HTML字符串转换为编辑器所需要的EditorState实例
  const editorState = BraftEditor.createEditorState(htmlString);
  useEffect(() => {
    form.setFieldsValue({
      title: detailInfo.title,
      details: editorState,
    });
  }, [detailInfo]);
  return (
    <Fragment>
      <Button type="primary" onClick={handleBack} icon={<ArrowLeftOutlined />}>
        返回
      </Button>
      <h2>标题</h2>
      <Form form={form} onFinish={handleFinsh}>
        <Form.Item initialValue={detailInfo.title} name="title">
          <Input></Input>
        </Form.Item>
        <h2>文本内容</h2>
        <Form.Item initialValue={editorState} name="details">
          <BraftEditor
            value={editData}
            onChange={handleChange}
            style={{ border: '1px solid #e8e8e8' }}
          />
        </Form.Item>
      </Form>

      <Button onClick={hanleSave} style={{ margin: '40px' }} type="primary">
        保存
      </Button>
    </Fragment>
  );
};

function mapStateToProps({ article, loading }) {
  return {
    article,
  };
}

function mapDispatchToProps(dispatch: any) {
  return { dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleEdit);
