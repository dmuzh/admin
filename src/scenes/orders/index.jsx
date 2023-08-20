import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Form,
  message,
  Popconfirm,
  Space,
  Modal,
} from 'antd';
import numeral from 'numeral';
import 'numeral/locales/vi';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

import axiosClient from '../../libraries/axiosClient';
import OrdersForm from '../../components/ordersForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomer] = useState([])
  const [products, setProducts] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [refresh, setRefresh] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(null);

  // const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
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



  const onSelectOders = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedOrders(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm],
  );



  const onEditFinish = useCallback(
    async (values) => {
      try {
        const response = await axiosClient.patch(
          `orders/${selectedOrders._id}`,
          values,
        );

        updateForm.resetFields();

        setEditModalVisible(false);

        onShowMessage(response.data.message);

        setRefresh((prevState) => prevState + 1);
      } catch (error) {
        console.log('««««« error »»»»»', error);
      }
    },
    [onShowMessage, selectedOrders?._id, updateForm],
  );

  const getOrders = useCallback(async () => {
    try {
      const res = await axiosClient.get('/orders');
      console.log('««««« res »»»»»', res.data.payload);
      setOrders(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);




  const columns = [

    {
      title: 'No',
      dataIndex: 'No',
      key: 'no',
      width: '1%',
      render: function (a, b, c) {
        return <span>{c + 1}</span>;
      },
    },
    {
      title: 'Actions ',
      dataIndex: 'no',
      key: 'no',
      width: '1%',

      render: function (text, record) {
        return (
          // <Link style={{ textDecoration: "none", color: "inherit" }} to={`${record._id}`}>
          //   <AiOutlineEye style={{ fontSize: 25, verticalAlign: 'middle' }} />
          // </Link>

          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectOders(record)}
            />

            <Link style={{ textDecoration: "none", color: "inherit" }} to={`${record._id}`}>
              <AiOutlineEye style={{ fontSize: 25, verticalAlign: 'middle' }} />
            </Link>
          </Space>

        );
      },
    },

    {
      title: 'Khách Hàng',
      dataIndex: 'customer',
      key: 'customerName',
      render: function (text, record) {
        return (
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`customers/${record.customer?._id}`}>
            {record.customer?.fullName}

          </Link>

        ); // record.supplier && record.supplier._id

      },
    },


  
    {
      title: 'Hình Thức Thanh Toán',
      key: 'paymentType',
      dataIndex: 'paymentType',
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'status',
      dataIndex: 'status',
      render: function (text, record) {
        let backgroundColor = '';
        let color = '';

        if (text === 'COMPLETED') {
          backgroundColor = '#388b84';
        } else if (text === 'WAITING') {
          backgroundColor = '#c49c1a';
        } else if (text === 'CANCELED') {
          backgroundColor = '#fd4332';
        }

        const statusStyle = {
          backgroundColor: backgroundColor,
          border: '1px solid black',
          borderRadius: '20px',
          padding: '3px 16px',
          // Các thuộc tính CSS khác tùy ý
        };

        return (
          <span style={statusStyle}>
            {text}
          </span>
        );
      },
    },
    {
      title: 'Ngày Giao Hàng',
      key: 'shippedDate',
      dataIndex: 'shippedDate',
    },


    // {
    //   title: 'Tên SP',
    //   dataIndex: 'employees',
    //   key: 'employeesName',
    //   render: function (text, record) {
    //     return (
    //       <Link to={`employees/${record.employees?._id}`}>
    //         {record.employees.lastName}

    //       </Link>
    //     );

    //   },

    // },


  ];
  //   const getCategory = useCallback(async () => {
  //     try {
  //         const res = await axiosClient.get('/categories');
  //         setCategory(res.data.payload || []);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }, []);
  const getCustomer = useCallback(async () => {
    try {
      const res = await axiosClient.get('/customers');
      setCustomer(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // data categori
  const getEmployee = useCallback(async () => {
    try {
      const res = await axiosClient.get('/employees');
      setEmployee(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getProduct = useCallback(async () => {
    try {
      const res = await axiosClient.get('/products');
      setProducts(res.data.payload);
      console.log('««««« product »»»»»', res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // getCategory();
    getProduct();
    getEmployee();
    getCustomer()
  }, [getEmployee, getProduct, getCustomer]);

  useEffect(() => {
    getOrders();
  }, [getOrders, refresh]);
  return (
    <>
      <div>
        <h1>Orders</h1>

      </div>
      {contextHolder}
      <Table rowKey="_id" dataSource={orders} columns={columns} />
      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <OrdersForm
          form={updateForm}
          customers={customers}
          orders={orders}
          onFinish={onEditFinish}
          formName="update-Orders"
          isHiddenSubmit
        />
      </Modal>



    </>
  );
}
