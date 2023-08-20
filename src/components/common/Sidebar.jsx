import * as React from 'react';
import {
  List
} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { TeamOutlined, IdcardOutlined, UserAddOutlined, FolderOpenOutlined } from '@ant-design/icons';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemAvatar from '@mui/material/ListItemAvatar';  
import { Link } from "react-router-dom";
import {AiFillDollarCircle,AiOutlineHome} from 'react-icons/ai';
import {FaRegHandshake} from'react-icons/fa'
import {BiSolidShoppingBag} from 'react-icons/bi'
export default function Sidebar() {

  const [open, setOpen] = React.useState(false);
  const [openOne, setOpenOne] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOne = () => {
    setOpenOne(!openOne);
  };

  return (
    <>
      <List
        sx={{
          width: '233px', 
          bgcolor: 'background.paper',

          color: 'text.primary',
          borderRight: '1px solid divider',
          // position: 'fixed', // Đặt vị trí cố định
          // top: '0', // Đặt vị trí từ phía trên
          // left: '0', // Đặt vị trí từ phía trái
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <div>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
            <ListItemButton>
              <ListItemAvatar >
                <img style={{ width: 180 }} src="https://cdn.shopify.com/s/files/1/0689/1443/files/CLOSCA-LOGO-WEB-BLACK_130x@2x.png?v=1559116993" alt="asdasd" />
              </ListItemAvatar>
            </ListItemButton>
          </Link>
        </div>

        <div>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }} >
            <ListItemButton>
              <ListItemIcon>
                <AiOutlineHome />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
        </div>

        {/* Product */}
        <div>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <BiSolidShoppingBag />
            </ListItemIcon>
            <ListItemText primary="Product" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div>
                <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="All Product" />
                  </ListItemButton>
                </Link>
              </div>
              <div>
                <Link to="/addProduct" style={{ textDecoration: "none", color: "inherit" }} >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <UserAddOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Add Product" />
                  </ListItemButton>
                </Link>
              </div>
            </List>
          </Collapse>
        </div>

        <div>
          <Link to="/customers" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <TeamOutlined />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
          </Link>
        </div>

        {/* Suppliers */}
        <div>
          <ListItemButton onClick={handleClickOne}>
            <ListItemIcon>
              <IdcardOutlined />
            </ListItemIcon>
            <ListItemText primary="Suppliers" />
            {openOne ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openOne} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <div>
                <Link to="/suppliers" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="All Suppliers" />
                  </ListItemButton>
                </Link>
              </div>
              <div>
                <Link to="/AddSuppliers" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Add Suppliers" />
                  </ListItemButton>
                </Link>
              </div>
            </List>
          </Collapse>
        </div>
        
        <div>
          <Link to="/Orders" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <AiFillDollarCircle />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </Link>
        </div>

        <div>
          <Link to="/categories" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <FolderOpenOutlined />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </Link>
        </div>

        <div>
          <Link to="/employees" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <FaRegHandshake />
              </ListItemIcon>
              <ListItemText primary="Employees" />
            </ListItemButton>
          </Link>
        </div>

       
      </List>
    </>
  );
}