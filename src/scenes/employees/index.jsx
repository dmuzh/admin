import { SearchOutlined } from '@ant-design/icons';
import {
    Button, Input, Space, Form, message, Popconfirm,

    Table, Avatar,Modal
} from 'antd';
import Highlighter from 'react-highlight-words';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import numeral from 'numeral';
import 'numeral/locales/vi';
import axiosClient from '../../libraries/axiosClient';
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EmployeesForm from '../../components/employeesForm'
const MESSAGE_TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
};
numeral.locale('vi');

const Employees = () => {
    const [employees, setEmployees] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [refresh, setRefresh] = useState(0);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [updateForm] = Form.useForm();
    const [selectedEmployees, setSelectedEmployees] = useState(null);

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
    const onDeleteEmployees = useCallback(
        (EmployeesID) => async () => {
            try {
                const response = await axiosClient.delete(`employees/${EmployeesID}`);

                onShowMessage(response.data.message);

                setRefresh((prevState) => prevState + 1);
            } catch (error) {
                console.log('««««« error »»»»»', error);
            }
        },
        [onShowMessage],
    );

    const onSelectEmployees = useCallback(
        (data) => () => {
            setEditModalVisible(true);

            setSelectedEmployees(data);

            updateForm.setFieldsValue(data);
        },
        [updateForm],
    );
    const onEditFinish = useCallback(
        async (values) => {
            try {
                const response = await axiosClient.patch(
                    `employees/${selectedEmployees._id}`,
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
        [onShowMessage, selectedEmployees?._id, updateForm],
    );

    const getEmployees = useCallback(async () => {
        try {
            const res = await axiosClient.get('/employees');
            setEmployees(res.data.payload || []);
        } catch (error) {
            console.log(error);
        }
    }, []);


    useEffect(() => {
        getEmployees();
    }, [getEmployees, refresh]);
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
                    <Space direction="vertical" size={16}>
                        <Space wrap size={16}>

                            <Avatar icon={<UserOutlined />} />
                        </Space>
                    </Space>

                )

            },
        },
        {
            title: 'firstName',
            dataIndex: 'firstName',
            key: 'firstName',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            ...getColumnSearchProps('last Name'),
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
            title: 'Age',
            dataIndex: 'birthday',
            key: 'age',
            render: (birthday) => {
                const birthDate = new Date(birthday);
                const age = new Date().getFullYear() - birthDate.getFullYear();
                return age;
            },
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
                    onClick={onSelectEmployees(record)}
                  />

                        <Popconfirm
                            title="Are you sure to delete?"
                            okText="Đồng ý"
                            cancelText="Đóng"
                            onConfirm={onDeleteEmployees(record._id)}
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
                <div><h1>employees</h1></div>
                <div className='add'>
                    <Link to='/ADDemployees' >
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab size="small" color="primary" aria-label="add" >
                                <AddIcon />
                            </Fab>

                        </Box>
                    </Link>
                </div>
            </div>

            <Table rowKey="_id" columns={columns} dataSource={employees} />
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
                <EmployeesForm
                    form={updateForm}
                    onFinish={onEditFinish}
                    formName="update-Categories"
                    isHiddenSubmit
                />
            </Modal>
        </div>);
};
export default Employees