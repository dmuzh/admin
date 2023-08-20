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
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import axiosClient from '../../libraries/axiosClient';
import ProductForm from '../../components/ProductForm';

const MESSAGE_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
};

numeral.locale('vi');

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [refresh, setRefresh] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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



  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm],
  );

  const onDeleteProduct = useCallback(
    (productId) => async () => {
      try {
        const response = await axiosClient.delete(`products/${productId}`);

        onShowMessage(response.data.message);

        setRefresh((prevState) => prevState + 1);
      } catch (error) {
        console.log('««««« error »»»»»', error);
      }
    },
    [onShowMessage],
  );

  const onEditFinish = useCallback(
    async (values) => {
      try {
        const response = await axiosClient.patch(
          `products/${selectedProduct._id}`,
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
    [onShowMessage, selectedProduct?._id, updateForm],
  );
  // cột dọc 
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
      title: 'Avata',
      key: 'cover',
      render: (text, record) => (
        <img src={record.cover} alt={record.name} style={{ width: 50 }} />
      ),
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
      render: function (text, record) {
        return <Link style={{ textDecoration: "none", color: "inherit" }} to={`${record._id}`}>{text}</Link>;
      },
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'supplier',
      key: 'supplierName',
      render: function (text, record) {
        return (
          <Link style={{ textDecoration: "none", color: "inherit" }} to={`suppliers/${record.supplier?._id}`}>
            {record.supplier?.name}
          </Link>
        ); // record.supplier && record.supplier._id
      },
    },
    {
      title: 'Danh sản phẩm',
      dataIndex: 'category',
      key: 'categoryName',
      render: function (text, record) {
        return (
          <div to={`categories/${record.category._id}`}>
            {record.category.name}
          </div>
        );
      },
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      render: function (text) {
        return <strong>{numeral(text).format('0,0$')}</strong>;
      },
    },
    {
      title: 'Chiết khấu',
      dataIndex: 'discount',
      key: 'discount',
      render: function (text) {
        return <strong>{`${text}%`}</strong>;
      },
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      render: function (text) {
        return <strong>{numeral(text).format('0,0')}</strong>;
      },
    },
    {
      title: 'Giá bán',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
      render: function (text, record, index) {
        return <strong>{numeral(text).format('0,0$')}</strong>;
      },
    },
    {
      title: 'Mô tả',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: '',
      key: 'actions',
      width: '1%',
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Are you sure to delete?"
              okText="Đồng ý"
              cancelText="Đóng"
              onConfirm={onDeleteProduct(record._id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  //data suppliers
  const getSuppliers = useCallback(async () => {
    try {
      const res = await axiosClient.get('/suppliers');
      setSuppliers(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // data categori
  const getCategories = useCallback(async () => {
    try {
      const res = await axiosClient.get('/categories');
      setCategories(res.data.payload || []);
    } catch (error) {
      console.log(error);
    }
  }, []);
  //lấy data product
  const getProductData = useCallback(async () => {
    try {
      const res = await axiosClient.get('/products');
      setProducts(res.data.payload);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSuppliers();

    getCategories();
  }, [getCategories, getSuppliers]);

  useEffect(() => {
    getProductData();
  }, [getProductData, refresh]);

  return (
    <div style={{marginTop:"70px"}}>

      {contextHolder}
      <div className='title'>
        <div><h3>Product</h3></div>
        <div className='add'>
          <Link to='/AddProduct' >
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab size="small" color="primary" aria-label="add" >
                <AddIcon />
              </Fab>

            </Box>
          </Link>
        </div>
      </div>
      <Table rowKey="_id" dataSource={products} columns={columns} />

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
        <ProductForm
          form={updateForm}
          suppliers={suppliers}
          categories={categories}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </div>
  );
}
