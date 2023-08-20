import React, { useCallback, useEffect, useState } from 'react';
import { message, Table } from 'antd';
import axiosClient from '../../libraries/axiosClient';
import { useParams, Link } from 'react-router-dom';
import numeral from 'numeral';
import 'numeral/locales/vi';
import { FiCalendar, FiMap, FiUser } from "react-icons/fi";

import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
const OrdersDetail = () => {

  const MESSAGE_TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
  };
  numeral.locale('vi');

  const params = useParams();


  const [ordersDetail, setOrdersDetail] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([]);



  // const onShowMessage = useCallback(
  //   (content, type = MESSAGE_TYPE.SUCCESS) => {
  //     messageApi.open({
  //       type: type,
  //       content: content,
  //     });
  //   },
  //   [messageApi],
  // );
  const getCustomers = useCallback(async () => {
    try {
      const res = await axiosClient.get('/customers');
      setCustomers(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getProduct = useCallback(async () => {
    try {
      const res = await axiosClient.get('/products');
      setProducts(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getOrdersDetail = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/orders/${params.id}`);
      setOrdersDetail(res.data.payload);
      
      console.log('««««« res »»»»»', res);

    } catch (error) {
      console.log(error);
    }
  }, []);

  //   const getCustomers = useCallback((customersID)=>async () => {
  //     try {
  //  const response = await axiosClient.delete(`customers/${customersID}`);        setCustomers(res.data.payload || []);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // }, []);


  useEffect(() => {
    getProduct();
    getCustomers()
  }, [getProduct,getCustomers]);
  useEffect(() => {
    {
      getOrdersDetail();
    }
  }, [getOrdersDetail, params.id]);

  //   useEffect(() => {
  //     getCustomers();
  // }, [getCustomers]);


  const columns = [
    {
      title: 'Ảnh demo',
      dataIndex: 'productId.cover',
      key: 'productId.cover',
      render: function (text, record) {
        return (
          <div style={{ textDecoration: "none", color: "inherit" }}
            to={`products/${record.product?._id}`}>
           <img style={{width:'55px',height:'55px',display:"flex",justifyItems:'center',alignItems:'center'}} src={record.product?.cover} alt="" /> 
          </div>
        ); // 
      },
    },
    {
      title: 'Name',
      dataIndex: 'productId',
      key: 'productId',
      render: function (text, record) {
        return (
          <div style={{ textDecoration: "none", color: "inherit" }}
            to={`products/${record.product?._id}`}>
            {record.product?.name}
          </div>
        ); // 
      },
    },
    {
      title: 'Giá thật ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Giá bán ',
      dataIndex: 'productId',
      key: 'productId',
      render: function (text, record) {
        return (
          <div style={{ textDecoration: "none", color: "inherit" }}
            to={`products/${record.product?._id}`}>
            {record.product?.discountedPrice}
          </div>
        ); // 
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <Box sx={{ pt: "80px", pb: "20px" }}>
        <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            p: "20px",
          }}
        >
          <Typography variant="h2">Order details</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ my: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FiCalendar />

                <Typography variant="h6">{ordersDetail.shippedDate}</Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ opacity: 0.7, pb: 1 }}>
                Order ID #
              </Typography>
            </Box>
            <Box >

              <span
                style={{
                  border: '2px solid rgb(154,95,57)',
                  padding: "3px 10px",
                  borderRadius: "5px",
                  textDecoration: "none",
                }}
              >
                {ordersDetail.status}
              </span>

            </Box>
          </Box>
          <Divider />
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box>
                  <IconButton
                    sx={{
                      color: "#049bf5",
                      backgroundColor: "rgba(4,155,245, 0.2) !important",
                    }}
                  >
                    <FiUser />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "20px", mb: 2 }}>
                    Customer
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Name: <span style={{ opacity: 0.7 }}>{ordersDetail.customer?.fullName}</span>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Email: <span style={{ opacity: 0.7 }}>{ordersDetail.customer?.email}</span>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Số Điện Thoại: <span style={{ opacity: 0.7 }}>{ordersDetail.customer?.phoneNumber}</span>
                  </Typography>
                  <Link
                    style={{
                      padding: "3px 10px",
                      color: "#049bf5",
                      backgroundColor: "rgba(4, 155, 245,0.2)",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    View Profile
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box>
                  <IconButton
                    sx={{
                      color: "#049bf5",
                      backgroundColor: "rgba(4,155,245, 0.2) !important",
                    }}
                  >
                    {/* <FaTruck /> */}
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "20px", mb: 2 }}>
                    Order Info
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                  
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Payment Method: <span style={{ opacity: 0.7 }}>{ordersDetail.paymentType}
                    </span>
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Status: <span style={{ opacity: 0.7 }}>{ordersDetail.status}
                    </span>
                  </Typography>
                  <Link
                    style={{
                      padding: "3px 10px",
                      color: "#049bf5",
                      backgroundColor: "rgba(4, 155, 245,0.2)",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    View all
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Box>
                  <IconButton
                    sx={{
                      color: "#049bf5",
                      backgroundColor: "rgba(4,155,245, 0.2) !important",
                    }}
                  >
                    <FiMap />
                  </IconButton>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ fontSize: "20px", mb: 2 }}>
                    Delivery
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    City: <span style={{ opacity: 0.7 }}>{ordersDetail.customer?.address}</span>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2 }}
                  >
                    Ngày Sinh: <span style={{ opacity: 0.7 }}>{ordersDetail.customer?.birthday}</span>
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "15px", mb: 2, opacity: 0.7 }}
                  >
                    P.O Box 893
                  </Typography>

                  <Link
                    style={{
                      padding: "3px 10px",
                      color: "#049bf5",
                      backgroundColor: "rgba(4, 155, 245,0.2)",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    View on Map
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <div
            style={{
              marginTop: '35px'
            }}>
            <h2>Sản phẩm đã order</h2>
            <Table rowKey="_id" dataSource={ordersDetail.orderDetails} columns={columns} />
          </div>
        </Paper>
      </Box>
    </>
  )
}

export default OrdersDetail