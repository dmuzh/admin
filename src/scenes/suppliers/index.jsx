import { SearchOutlined } from '@ant-design/icons';
import {
    Button, Input, Space, Form, message, Popconfirm,

    Table, Modal,

} from 'antd'; import Highlighter from 'react-highlight-words';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import axiosClient from '../../libraries/axiosClient';
import SuppliersForm from '../../components/suppliersForm'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


const MESSAGE_TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
};

const Suppliers = () => {

    const [suppliers, setSuppliers] = useState([])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [refresh, setRefresh] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedSuppliers, setSelectedSuppliers] = useState(null);
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

            setSelectedSuppliers(data);

            updateForm.setFieldsValue(data);
        },
        [updateForm],
    );

    const onEditFinish = useCallback(
        async (values) => {
            try {
                const response = await axiosClient.patch(
                    `suppliers/${selectedSuppliers._id}`,
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
        [onShowMessage, selectedSuppliers?._id, updateForm],
    );
    const getSuppliers = useCallback(async () => {
        try {
            const res = await axiosClient.get('/suppliers');
            setSuppliers(res.data.payload || []);
        } catch (error) {
            console.log(error);
        }
    }, []);
    const onDeleteSuppliers = useCallback(
        (suppliersID) => async () => {
            try {
                const response = await axiosClient.delete(`suppliers/${suppliersID}`);

                onShowMessage(response.data.message);

                setRefresh((prevState) => prevState + 1);
            } catch (error) {
                console.log('««««« error »»»»»', error);
            }
        },
        [onShowMessage],
    );

    useEffect(() => {
        getSuppliers();
    }, [getSuppliers, refresh]);
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
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },


        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'phoneNumber',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber'),
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
                            onClick={onSelectProduct(record)}
                        />

                        <Popconfirm
                            title="Are you sure to delete?"
                            okText="Đồng ý"
                            cancelText="Đóng"
                            onConfirm={onDeleteSuppliers(record._id)}
                        >
                            <Button danger type="dashed" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];

    return (

        <div style={{marginTop:'70px'}}>
            
            {contextHolder}
            <div className='title'>
                <div><h5>Suppliers</h5></div>
                <div className='add'>
                    <Link to='/AddSuppliers' >
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab size="small" color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab>

                        </Box>
                    </Link>
                </div>
            </div>

            <Table rowKey="_id" columns={columns} dataSource={suppliers} />
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
                <SuppliersForm
                    form={updateForm}
                    onFinish={onEditFinish}
                    formName="update-suppliers"
                    isHiddenSubmit
                />
            </Modal>
        </div>);
};
export default Suppliers