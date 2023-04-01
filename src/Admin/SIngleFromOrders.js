import React from "react";
import { Card, Col } from "react-bootstrap";
import styled from "styled-components";
import { Button } from "../styles/Button";

const StyledCardTitle = styled(Card.Title)`
  color: red;
`;

const StyledCardText = styled(Card.Text)`
  font-weight: bold;
  text-justify: distribute;
  margin-bottom: 0;
  font-size: 18px;
`;

const StyledPriceText = styled(Card.Text)`
  text-justify: justify;
  color: #dc3545;
`;

const StyledCol = styled(Col)`
  &.shadow {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  &.shadow:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &.bg-body {
    background-color: #fff;
  }
  padding: 10px;
  font-size: 20px;
`;

const SIngleFromOrders = (props) => {
  const { email, finalprice, status, _id } = props.service;
  const { name, address, number, date } = props.service.formData;

  const updatehandle = (e) => {
    console.log(e);
    const url = `https://mernecommerce-o4jz.onrender.com/cart/${_id}`;
    console.log(url);
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Updated Successfully");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <StyledCol className="shadow mb-5 bg-body">
      <Card>
        <Card.Body>
          {/* <StyledCardTitle>{_id}</StyledCardTitle> */}
          <StyledCardText>
            <h3 style={{ color: "green", fontWeight: "bold" }}>
              <span className="text-success">Date :</span> {date}
            </h3>
          </StyledCardText>
          <StyledCardText>
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              <span className="text-success">Name :</span> {name}
            </h3>
          </StyledCardText>
          <StyledCardText>
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              <span className="text-success">Email :</span> {email}
            </h3>
          </StyledCardText>
          <StyledCardText>
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              <span className="text-success">Address :</span> {address}
            </h3>
          </StyledCardText>
          <StyledCardText>
            <h3 style={{ color: "black", fontWeight: "bold" }}>
              <span className="text-success">Number :</span> {number}
            </h3>
          </StyledCardText>
          {props.service.cartData.map((data) => {
            return (
              <OrderItem>
                <ItemImage>
                  {data.image ? (
                    <img src={data.image} width="50" alt="pic" />
                  ) : (
                    <img src={data.imgA} width="50" alt="pic" />
                  )}
                </ItemImage>
                <ItemDetails>
                  <h3>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Name:
                    </span>{" "}
                    {data.name}
                  </h3>
                  <h3>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Color:
                    </span>{" "}
                    {data.color}
                  </h3>
                  <h3>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Quantity:
                    </span>{" "}
                    {data.amount}
                  </h3>
                  <h3>
                    <span style={{ color: "blue", fontWeight: "bold" }}>
                      Per Ps Price:
                    </span>{" "}
                    {data.price} TK
                  </h3>
                </ItemDetails>
              </OrderItem>
            );
          })}

          <StyledCardText>
            <h3 style={{ fontWeight: "bold", color: "green" }}>
              <span className="text-success">Status:</span> {status}
            </h3>
          </StyledCardText>
          <StyledPriceText>
            <h5>Total Price ~~ BDT : {finalprice}</h5>
          </StyledPriceText>
          <Card.Text className="text-start">
            <Button onClick={() => updatehandle({ status: "Pending" })}>
              Pending
            </Button>
            <Button
              style={{ margin: 5 }}
              onClick={() => updatehandle({ status: "Confirm" })}
            >
              Confirm
            </Button>
            <Button onClick={() => updatehandle({ status: "Delivered" })}>
              Delivered
            </Button>
            <Button
              onClick={() => updatehandle({ status: "Reject" })}
              style={{ margin: 5 }}
            >
              Reject
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </StyledCol>
  );
};

const DashboardContainer = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
`;

const DashboardHeader = styled.div`
  margin-bottom: 20px;
`;

const DashboardBody = styled.div``;

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px black solid;
  margin-bottom: 20px;
  padding: 20px;
`;

const OrderDetails = styled.div`
  width: 30%;
  font-weight: bold;
`;

const OrderItems = styled.div`
  width: 50%;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ItemImage = styled.div`
  width: 20%;
`;

const ItemDetails = styled.div`
  width: 80%;
  font-weight: bold;
`;

const OrderTotal = styled.div`
  width: 15%;
  color: red;
`;
const OrderStatus = styled.div`
  width: 15%;
  color: green;
`;

export default SIngleFromOrders;
