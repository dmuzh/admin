import { Box,  Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";

import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";

import React, { useCallback, useEffect, useState } from 'react';
import {
  Table

} from 'antd';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productsSale, setProductsSale] = useState([]);
  const [money, setMoney] = useState([]);


  const url = `https://test-node-cx2p.onrender.com/questions/hotsale`;
  const getProductsSale = useCallback(async () => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setProductsSale(data.payload)
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const urls = `https://test-node-cx2p.onrender.com/questions/30`;
  const getMoney = useCallback(async () => {
    try {
      fetch(urls)
        .then(response => response.json())
        .then(data => {
          setMoney(data.payload)
        });
    } catch (error) {
      console.log(error);
    }
  }, []);


  const columns = [
    {
      title: 'Avata',
      key: 'cover',
      render: (text, record) => (
        <img src={record.cover} alt={record.name} style={{ width: 50 }} />
      ),
    },

    {
      title: 'Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng Trong Kho',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Giá Bán',
      dataIndex: 'discountedPrice',
      key: 'discountedPrice',
    },
  ];
  const column = [


    {
      title: 'Sản Phẩm',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Tổng Tiền($)',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
  ];


  useEffect(() => {
    getProductsSale();
    getMoney()
  }, [getProductsSale,getMoney]);
  return (
    <Box m="20px" marginTop="100px">
      <h2>Dashboard</h2>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="5"
            subtitle="Khách Hàng"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >

          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <Table
             rowKey="_id"
              columns={column}
              dataSource={money}
              pagination={{
                pageSize: 50,
              }}
              scroll={{
                y: 240,
              }}
            />
            {/* <Table dataSource={money} columns={column} /> */}
          </Box>
        </Box>
        {/* box ben */}


        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >

          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            padding="30px"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ marginBottom: "15px" }}
            >
              Geography Based Traffic
            </Typography>
            <Box height="200px">
              <GeographyChart isDashboard={true} />
            </Box>
          </Box>

        </Box>

        {/* ROW 3 */}



      </Box>
      <div style={{
        backgroundColor: 'white',
        borderRadius: ' 20px',
        marginTop: '15px',
      }} >
        <div style={{
          paddingTop: '15px',

        }}>
          <h2>Sản Phẩm Bán Chạy</h2>
          <Table style={{ backgroundColor: 'rgb(244,247,254)' }} rowKey="_id" dataSource={productsSale} columns={columns} />
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;