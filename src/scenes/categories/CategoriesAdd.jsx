import React, { useCallback, useEffect, useState } from 'react';
import {

  Form,
  message,
  
} from 'antd';
import numeral from 'numeral';
import 'numeral/locales/vi';


import axiosClient from '../../libraries/axiosClient';
import CategoriesFrom from '../../components/categoriesForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function CategoriesAdd() {
  const [categories, setCategories] = useState([]);

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
        const res = await axiosClient.post('/categories', values);

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
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {

    getCategories();
  }, [getCategories, refresh]);



  return (
    <>
      {contextHolder}
      <CategoriesFrom
        form={createForm}
     
        onFinish={onFinish}
        optionStyle={{
          maxWidth: 900,
          margin: '60px auto',
        }}
      />
    </>
  );
}