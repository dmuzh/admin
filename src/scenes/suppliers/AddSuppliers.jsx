import React, { useCallback, useEffect, useState } from 'react';
import {

  Form,
  message,
  
} from 'antd';
import numeral from 'numeral';
import 'numeral/locales/vi';


import axiosClient from '../../libraries/axiosClient';
import SuppliersForm from '../../components/suppliersForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function AddSuppliers() {
    const [suppliers, setSuppliers] = useState([])

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
        const res = await axiosClient.post('/suppliers', values);

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





// data categori
  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get('/suppliers');
      setSuppliers(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {

    getSuppliers();
  }, [getSuppliers, refresh]);



  return (
    <>
      {contextHolder}
      <SuppliersForm
        form={createForm}
        onFinish={onFinish}
        optionStyle={{
          maxWidth: 900,
          margin: '120px 50px 0 10px',
        }}
      />
    </>
  );
}