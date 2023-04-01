import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Container as BootstrapContainer,
  Row as BootstrapRow,
  Spinner as BootstrapSpinner,
} from "react-bootstrap";
import SIngleFromOrders from "./SIngleFromOrders";

const AllOrders = () => {
  const [allorders, setAllorders] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch("https://mernecommerce-o4jz.onrender.com/cart")
      .then((res) => res.json())
      .then((data) => {
        setAllorders(data);
        setLoad(true);
      });
  }, []);

  const reversedData = allorders.reverse();

  return (
    <AllOrdersContainer>
      <Title>ALl Orders : {allorders.length} </Title>

      <Container>
        {load ? (
          <OrdersRow className="mt-3">
            <div>
              {reversedData.map((service) => (
                <SIngleFromOrders
                  service={service}
                  key={service.name}
                ></SIngleFromOrders>
              ))}
            </div>
          </OrdersRow>
        ) : (
          <StyledSpinner animation="border" variant="primary" />
        )}
      </Container>
    </AllOrdersContainer>
  );
};

const AllOrdersContainer = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-top: 4px;
  color: black;
`;

const Container = styled(BootstrapContainer)`
  margin-top: 30px;
`;

const OrdersRow = styled(BootstrapRow)`
  margin-top: 20px;

  > div {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  @media screen and (max-width: 767px) {
    > div {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    > div {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }

  @media screen and (min-width: 992px) {
    > div {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const StyledSpinner = styled(BootstrapSpinner)`
  margin: 30px auto;
`;

export default AllOrders;
