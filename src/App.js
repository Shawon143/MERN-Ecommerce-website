import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./Login";
// import TestProduct from "./components/TestProduct";
// import SingleTest from "./components/SingleTest";
import AddCar from "./components/AddCar";
import PlaceOrder from "./PlaceOrder";
import Dashboard from "./Dashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import MakeAdmin from "./Admin/MakeAdmin";
import AllOrders from "./Admin/AllOrders";
import ManageProducts from "./Admin/ManageProducts";
import Update from "./Admin/Update";
import Addcolor from "./Admin/Addcolor";
// import PrivateRoute from "./PrivateRoute";
// import AddCar from "./components/AddCar";

const App = () => {
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/makeadmin" element={<MakeAdmin />} />
          <Route path="/manageorders" element={<AllOrders />} />
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/addcolor" element={<Addcolor />} />

          <Route path="/contact" element={<Contact />} />
          {/* <PrivateRoute path="/contact" element={<Contact />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/testProducts" element={<TestProduct />} /> */}
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="update/:id" element={<Update />} />
          {/* <Route path="/singletest/:id" element={<SingleTest />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
