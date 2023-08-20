import React, { useCallback, useEffect, useState } from 'react';
import {

  Form,
  message,
  
} from 'antd';
import numeral from 'numeral';
import 'numeral/locales/vi';

import axiosClient from '../../libraries/axiosClient';
import CustomersFrom from '../../components/customersForm'
const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function AddCustomers() {
  const [customers, setCustomers] = useState([])


  const [refresh, setRefresh] = useState(0);

  const [createForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();



  const onShowMessage = useCallback(
    (content, type = MESSAGE_TYPE.SUCCESS) => {
      messageApi.open({
        type: type,
        content: content,
      });
    },
    [messageApi],
  );

  const onFinish = useCallback(
    async (values) => {
      try {
        const res = await axiosClient.post('/customers', values);

        setRefresh((preState) => preState + 1);
        createForm.resetFields();

        onShowMessage(res.data.message);

  
      } catch (error) {
        if (error?.response?.data?.errors) {
          error.response.data.errors.map((e) =>
            onShowMessage(e, MESSAGE_TYPE.ERROR),
          );
        }
      }
    },
    [createForm, onShowMessage],
  );

console.log('««««« ádasdas »»»»»');
//lấy data 
  const getCustomersData = useCallback(async () => {
    try {
      const res = await axiosClient.get('/customers');
      console.log('««««« res »»»»»', res);
      setCustomers(res.data.payload || []);
  } catch (error) {
      console.log(error);
  }
  }, []);


  useEffect(() => {
    getCustomersData();
  }, [getCustomersData, refresh]);

  return (
    <>
      {contextHolder}
      <CustomersFrom
        form={createForm}
        onFinish={onFinish}
        formName="add-customers-form"
        optionStyle={{
          maxWidth: 900,
          margin: '60px auto',
        }}
      />
    </>
  );
}