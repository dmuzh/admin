import { SearchOutlined } from '@ant-design/icons';
import {
    Button, Input, Space, Form, message, Popconfirm,

    Table, Modal
} from 'antd';
// import { AntDesignOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import axiosClient from '../../libraries/axiosClient';
import CustomersFrom from "../../components/customersForm"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
// import { Link } from "react-router-dom";
import "./style.css"
// import * as React from 'react';

const MESSAGE_TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
};

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [refresh, setRefresh] = useState(0);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
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
                                closeDropdown: false,
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
    const onDeleteCustomers = useCallback(
        (customersID) => async () => {
            try {
                const response = await axiosClient.delete(`customers/${customersID}`);

                onShowMessage(response.data.message);

                setRefresh((prevState) => prevState + 1);
            } catch (error) {
                console.log('««««« error »»»»»', error);
            }
        },
        [onShowMessage],
    );
    const onSelectCustomers = useCallback(
        (data) => () => {
            setEditModalVisible(true);

            setSelectedCustomers(data);

            updateForm.setFieldsValue(data);
        },
        [updateForm],
    );
    const getCustomers = useCallback(async () => {
        try {
            const res = await axiosClient.get('/customers');
            setCustomers(res.data.payload || []);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const onEditFinish = useCallback(
        async (values) => {
            try {
                const response = await axiosClient.patch(
                    `customers/${selectedCustomers._id}`,
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
        [onShowMessage, selectedCustomers?._id, updateForm],
    );
    useEffect(() => {
        getCustomers();
    }, [getCustomers, refresh]);
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
            key: 'no',
            render: function () {
                return (
                    <Avatar.Group
                        size="large"
                        maxStyle={{
                            cursor: 'pointer',
                        }}
                    >
                        <Avatar src="https://i.pinimg.com/originals/39/75/c2/3975c2b481508b026190f069e83b2bdd.png" />


                    </Avatar.Group>

                )
            },
        },
     
        {
            title: 'Name',
            dataIndex: 'fullName',
            key: 'fullName',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
                },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'Age',
            dataIndex: 'birthday',
            key: 'age',
            render: (birthday) => 
            {
                console.log('««««« birthday »»»»»', birthday);
                const birthDate = new Date(birthday);
                const age = new Date().getFullYear() - birthDate.getFullYear();
                return age;
            },
            // ...getColumnSearchProps('birthday'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
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
                            onClick={onSelectCustomers(record)}
                        />

                        <Popconfirm
                            title="Are you sure to delete?"
                            okText="Đồng ý"
                            cancelText="Đóng"
                            onConfirm={onDeleteCustomers(record._id)}
                        >
                            <Button danger type="dashed" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    return (
        <div style={{marginTop:"70px"}}>
           
            {contextHolder}
            <div><h3>Customers</h3></div>

            <Table rowKey="_id" columns={columns} dataSource={customers} />

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
                <CustomersFrom
                    form={updateForm}
                    // suppliers={suppliers}
                    // categories={categories}
                    onFinish={onEditFinish}
                    formName="update-product"
                    isHiddenSubmit
                />
            </Modal>
        </div>);
};
export default Customers