import React, { memo } from 'react';
import { Button, Form, Input, InputNumber, Select,  DatePicker,
} from 'antd';

import { convertOptionSelect } from '../utils';

function EmployeesForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,

    onFinish,
  } = props;

  return (
    <Form
      form={form}
      className=""
      name={formName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={optionStyle}
      onFinish={onFinish}
    >
      <Form.Item
        label="Họ và Tên"
        name="firstName"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Tên"
        name="lastName"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>





      <Form.Item
        label="Số điên thoại"
        name="phoneNumber"
        rules={[
          {
            type: 'number',
            min: 0,
          },
          { required: true, message: 'Vui lòng nhập thông tin ' },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Địa Chị"
        name="address"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa Chị"
        name="address"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="password"
        name="password"
        rules={[
          { required: true, message: 'Vui lòng Thêm Thông Tin' },
          { max: 50, message: 'Tối đa 50 ký tự' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>

      {/* <Form.Item
        label="Tồn kho"
        name="stock"
        rules={[
          {
            type: 'number',
            min: 0,
            message: 'Vui lòng nhập tồn kho lớn hơn 0',
          },
          { required: true, message: 'Vui lòng nhập tồn kho' },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item> */}

  


      <Form.Item label="Mô tả" name="description">
        <Input />
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
  )
}

export default memo(EmployeesForm);