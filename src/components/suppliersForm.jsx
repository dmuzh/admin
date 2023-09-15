import {
  Button,
  Form,
  Input,
  // Select,
} from 'antd';

import React, { memo } from 'react';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};


function suppliersForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
    onFinish,
  } = props;
  return (
    <Form
      {...formItemLayout}
      form={form}
      className=""

      name={formName}
      onFinish={onFinish}
      style={optionStyle}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Nhà Cung Cấp"
        name="name"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện Thoại"
        name="phoneNumber"
        rules={[

          { required: true, message: 'Vui lòng thông tin' },
        ]}
      >
        <Input />

      </Form.Item>

      <Form.Item
        label="Địa Chỉ Nhà Cung Cấp"
        name="address"
        rules={[
          { required: true, message: 'Vui lòng nhập thông tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        {form && <Input showCount maxLength={100} />}
      </Form.Item>




      {
        !isHiddenSubmit && (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )
      }

    </Form>
  );
};
export default memo(suppliersForm);
