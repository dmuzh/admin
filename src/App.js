import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./scenes/dashboard";
import Navbar from "./components/common/Navbar";
import Product from "./scenes/product"
import AddProduct from "./scenes/ADDproduct"
import Categories from "./scenes/categories"
import Customers from "./scenes/customers"
import Suppliers from "./scenes/suppliers"
import Employees from "./scenes/employees"
import CategoriesAdd from "./scenes/categories/CategoriesAdd"
import ProductDetail from "./scenes/product/productDetail"
import AddSuppliers from "./scenes/suppliers/AddSuppliers"
import ADDemployees from "./scenes/employees/ADDemployees"
import Orders from "./scenes/orders"
import OrdersDetail from "./scenes/orders/ordersDetail"
// import Sidebars from "./scenes/global/Sidebars.jsx"

const sideBarWidth = 200;

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        sideBarWidth={sideBarWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sideBarWidth={sideBarWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}

      />
      {/* <Sidebars /> */}

      {/* <div > */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 2 },
          width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        {/* Routes */}
        <Routes style={{ paddingTop: '20px' }} >
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="products/:id" element={<ProductDetail />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrdersDetail />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/AddSuppliers" element={<AddSuppliers />} />
          <Route path="/ADDemployees" element={<ADDemployees />} />

          <Route path="/CategoriesAdd" element={<CategoriesAdd />} />

        </Routes>
      </Box>
      {/* </div> */}
    </Box>
  );
}

export default App;
