import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import numeral from 'numeral';
import 'numeral/locales/vi';
import { Box, Chip, Grid, Paper, Rating, Typography } from "@mui/material";

import axiosClient from '../../libraries/axiosClient';
// import ProductForm from '../../components/ProductForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function Products() {
  const params = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  // const [productForm] = Form.useForm();
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

  const onDeleteProduct = useCallback(async () => {
    try {
      const response = await axiosClient.delete(`products/${params.id}`);

      onShowMessage(response.data.message);

      navigate('/products');
    } catch (error) {
      console.log('««««« error »»»»»', error);
    }
  }, [navigate, onShowMessage, params.id]);

  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get('/suppliers');
      setSuppliers(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const getProductData = useCallback(async () => {
  //   try {
  //     const res = await axiosClient.get(`/products/${params.id}`);

  //     productForm.setFieldsValue(res.data.payload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [params.id, productForm]);
  const getProductData = useCallback(async () => {
    try {
      const res = await axiosClient.get(`/products/${params.id}`);
      setProducts(res.data.payload);
      console.log('««««« setProducts(res.data.payload) »»»»»', (res.data.payload));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);

  const isEditProduct = useMemo(() => !(params.id === 'add'), [params.id]);

  useEffect(() => {
    if (isEditProduct) {
      getProductData();
    }
  }, [getProductData, isEditProduct, params.id]);

  return (
    <div style={{marginTop:'100px'}}>
      {contextHolder}
      <Box sx={{ pt: "10px", pb: "20px" }}>
        <Typography variant="h5">Product Details</Typography>
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <img
                src={products.cover}
                alt='a'
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Typography variant="h4">{products.name}</Typography>
              <Typography variant="h5">
                <span
                  style={{
                    opacity: 0.7,
                    textDecoration: "line-through",
                    fontSize: "13px",
                  }}
                >
                  {products.price}
                </span>{" "}
                ${products.discountedPrice}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
                <Typography variant="subtitle2">284 customer reviews</Typography>
                <Rating
                  value={Number((Math.random() * 5).toFixed(2))}
                  precision={0.5}
                  readOnly
                />
              </Box>
              <Typography variant="subtitle2"> Số Lượng Trong Kho :{products.stock}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 4, my: 2 }}>
                <Typography variant="subtitle2">Mô Tả</Typography>
                <Chip label={products.description} />
              </Box>

            </Grid>
          </Grid>
          <div style={{display:'flex',
        justifyContent: 'end'}}>
          {isEditProduct ? (
          <Popconfirm
            title="Are you sure to delete?"
            okText="Đồng ý"
            cancelText="Đóng"
            onConfirm={onDeleteProduct}
          >
            <Button danger type="dashed" icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        ) : (
          <Button type="primary">
            Thêm
          </Button>
        )
        }
        </div>
        </Paper>
      
      </Box>
   


    </div>
  );
}