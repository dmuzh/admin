import {
  Button,
  Checkbox,
  Form,
  Input,
  // Select,
  Upload,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import React, { useState, memo } from 'react';
// const { Option } = Select;

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


function CategoriesForm(props) {
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
        label="Địa chỉ ảnh danh mục"
        name="cover"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tên Danh Mục Sản Phẩm"
        name="name"
        rules={[
          { required: true, message: 'Vui lòng nhập tên sản phẩm' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

    
      <Form.Item
        label="Mô Tả"
        name="description"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input showCount maxLength={100} />
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
export default memo(CategoriesForm);
