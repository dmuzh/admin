import React, { useCallback, useEffect, useState, useRef } from 'react';
import numeral from 'numeral';
// import Collapse from 'react-bootstrap/Collapse'
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import 'numeral/locales/vi';
import { DeleteOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';

import {
    Button, Input, Space, Form, message, Popconfirm,

    Table, Modal
} from 'antd';
import Highlighter from 'react-highlight-words';
import axiosClient from '../../libraries/axiosClient';
import CategoriesForm from "../../components/categoriesForm"
const MESSAGE_TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
};
numeral.locale('vi');

export default function Categories() {
    const [categories, setCategories] = useState([]);
    // const [suppliers, setSuppliers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [refresh, setRefresh] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState(null);

    // const [createForm] = Form.useForm();
    const [updateForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const onShowMessage = useCallback(
        (content, type = MESSAGE_TYPE.SUCCESS) => {
            messageApi.open({
                type: type,
                content: content,
            });
        },
        [messageApi],
    );
    const onSelectCategories = useCallback(
        (data) => () => {
            console.log('««««« data »»»»»', data);
            setEditModalVisible(true);
            setSelectedCategories(data);

            updateForm.setFieldsValue(data);
        },
        [updateForm],
    );
    const onEditFinish = useCallback(
        async (values) => {
            console.log('««««« values »»»»»', values);
            try {
                const response = await axiosClient.patch(
                    `categories/${selectedCategories._id}`,
                    values,
                );
                console.log('««««« response »»»»»', response);
                updateForm.resetFields();

                setEditModalVisible(false);

                onShowMessage(response.data.message);

                setRefresh((prevState) => prevState + 1);
            } catch (error) {
                console.log('««««« error »»»»»', error);
            }
        },
        [onShowMessage, selectedCategories?._id, updateForm],
    );

    const onDeleteCategories = useCallback(
        (categoriesId) => async () => {
            try {
                const response = await axiosClient.delete(`categories/${categoriesId}`);

                onShowMessage(response.data.message);

                setRefresh((prevState) => prevState + 1);
            } catch (error) {
                console.log('««««« error »»»»»', error);
            }
        },
        [onShowMessage],
    );
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

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: true,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
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
            title: 'Tên Danh Mục Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            // width: '20%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
            // width: '30%',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Thời Gian Tạo Ra',
            key: 'createdAt',
            dataIndex: 'createdAt',
          },
          {
            title: 'Thời Gian Cập Nhập ',
            key: 'updatedAt',
            dataIndex: 'updatedAt',
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
                            onClick={onSelectCategories(record)}
                        />

                        <Popconfirm
                            title="Are you sure to delete?"
                            okText="Đồng ý"
                            cancelText="Đóng"
                            onConfirm={onDeleteCategories(record._id)}
                        >
                            <Button danger type="dashed" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                );
            },
        },



    ];



    return (
        <>
            {contextHolder}
            <div className='title'>
                <div><h1>Categories</h1></div>
                <div className='add'>
                    <Link to='/CategoriesAdd' >
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab size="small" color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab>

                        </Box>
                    </Link>
                </div>
            </div>
            <Table rowKey="_id" columns={columns} dataSource={categories} />
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
                <CategoriesForm
                    form={updateForm}
                    onFinish={onEditFinish}
                    formName="update-Categories"
                    isHiddenSubmit
                />
            </Modal>


        </>
    )
};
