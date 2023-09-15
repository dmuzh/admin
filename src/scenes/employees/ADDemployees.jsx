import React, { useCallback, useEffect, useState } from 'react';
import {

  Form,
  message,

} from 'antd';
import {
  Box,
  Typography,
  Paper,

} from "@mui/material";
import numeral from 'numeral';
import 'numeral/locales/vi';


import axiosClient from '../../libraries/axiosClient';
import EmployeesForm from '../../components/employeesForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function ADDemployees() {
  const [employees, setEmployees] = useState([])

  const [refresh, setRefresh] = useState(0);

  const [createForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();



  const onShowMessage = useCallback(
    (content, type = MESSAGE_TYPE.SUCCESS) => {
      messageApi.open({
        type: type,
        content: content,
        style: {
          marginTop: '100px',
        },
      });
    },
    [messageApi],
  );

  const onFinish = useCallback(
    async (values) => {
      try {
        const res = await axiosClient.post('/employees', values);

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
  const getEmployees = useCallback(async () => {
    try {
      const res = await axiosClient.get('/employees');
      console.log('««««« res »»»»»', res);
      setEmployees(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {

    getEmployees();
  }, [getEmployees, refresh]);



  return (


    <Box sx={{ pt: "80px", pb: "20px" }}>

      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          p: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        {contextHolder}

          Add Employees
        </Typography>
        <EmployeesForm
          form={createForm}
          onFinish={onFinish}
          optionStyle={{
            maxWidth: 900,
            margin: '20px 50px 0 0',
          }}
        />


      </Paper>
    </Box>




  );
}