import React, { memo } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';

import { convertOptionSelectOne, convertOptionSelect,convertOptionSelectTwo} from '../utils';

const STATUS_ARRAY = [{_id : 1, name: 'WAITING'}, {_id : 2, name: 'COMPLETED'}, {_id : 3, name: 'CANCELED'}]

function OrdersForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
    // suppliers,
    // categories,
    orders,
    customers,
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
        label="Khách Hàng"
        name="customerId"
        rules={[
          {
            required: false,
            message: 'Vui lòng chọn nhà cung cấp',
          },
        ]}
      >
        <Select disabled
          options={convertOptionSelectOne(customers) }
        />
      </Form.Item>

    

      <Form.Item
        label="Ngày giao hàng"
        name="shippedDate"
        rules={[
          { required: false, },
        ]}
      >
        <Input  />
      </Form.Item>

   
      <Form.Item label="Hình Thức Thanh Toán" 
      name="paymentType">
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Trạng Thái"
        name="status"
      >
         <Select 
          options={convertOptionSelect(STATUS_ARRAY)}
        />
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

export default memo(OrdersForm);