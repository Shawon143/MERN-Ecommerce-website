import React from "react";
import { NavLink } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { Button } from "../styles/Button";
import styled from "styled-components";

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <Container>
      <h2>
        <span style={{ color: "red" }}>{user.displayName}</span> Dashboard
      </h2>

      <ButtonContainer>
        <CustomButton>
          <NavLink to="/makeadmin" className="navbar-link ">
            Make Admin
          </NavLink>
        </CustomButton>
        <CustomButton>
          <NavLink to="/manageorders" className="navbar-link ">
            Manage All Orders
          </NavLink>
        </CustomButton>
        <CustomButton>
          <NavLink to="/manageproducts" className="navbar-link ">
            Manage products
          </NavLink>
        </CustomButton>
        <CustomButton>
          <NavLink to="/addcar" className="navbar-link ">
            Add Car
          </NavLink>
        </CustomButton>
        <CustomButton>
          <NavLink to="/addcolor" className="navbar-link ">
            Add Color
          </NavLink>
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
};

export default AdminDashboard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CustomButton = styled(Button)`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
