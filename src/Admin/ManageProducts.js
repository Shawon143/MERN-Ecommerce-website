import React from "react";
import { NavLink } from "react-router-dom";
import { useFilterContext } from "../context/filter_context";
import { Button } from "../styles/Button";
import ManageProduct from "./ManageProduct";

const ManageProducts = () => {
  const { filter_products, grid_view } = useFilterContext();

  return (
    <div>
      <h2>Manage Products</h2>
      <div>
        <Button>
          <NavLink to="/admindashboard" className="navbar-link ">
            Admin Dashboard
          </NavLink>
        </Button>
      </div>
      <div>
        <ManageProduct products={filter_products}></ManageProduct>
      </div>
    </div>
  );
};

export default ManageProducts;
