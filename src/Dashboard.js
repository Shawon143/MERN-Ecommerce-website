import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAuth from "./hooks/useAuth";
import styled from "styled-components";
import { Button } from "./styles/Button";

const DashboardContainer = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
  @media only screen and (min-width: 768px) {
    width: 30%;
  }
`;

const DashboardBody = styled.div`
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 70%;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px black solid;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const OrderDetails = styled.div`
  width: 100%;
  font-weight: bold;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    width: 40%;
    margin-bottom: 0;
  }
`;

const OrderItems = styled.div`
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 60%;
  }
`;

const OrderItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    margin-bottom: 0;
  }
`;

const ItemImage = styled.div`
  width: 100%;
  @media only screen and (min-width: 768px) {
    width: 30%;
  }
`;

const ItemDetails = styled.div`
  width: 100%;
  font-weight: bold;
  margin-left: 10px;
  @media only screen and (min-width: 768px) {
    width: 70%;
    margin-left: 20px;
  }
`;

const OrderTotal = styled.div`
  width: 100%;
  color: red;
  margin-top: 10px;
  @media only screen and (min-width: 768px) {
    width: 15%;
    margin-top: 0;
  }
`;

const OrderStatus = styled.div`
  width: 100%;
  color: green;
  margin-top: 10px;
  @media only screen and (min-width: 768px) {
    width: 15%;
    margin-top: 0;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:7000/carts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [user.email]);

  const reversedData = order.reverse();

  // order delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure for you delete this car ?");
    if (confirm) {
      fetch(`http://localhost:7000/cart/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            window.location.reload();
          }
        });
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h2>
          <span style={{ color: "Red" }}>{user.displayName}</span> Dashboard
        </h2>
      </DashboardHeader>
      <DashboardBody>
        {reversedData.map((curElem) => {
          return (
            <OrderContainer>
              <OrderDetails>
                <p style={{ fontWeight: "bold" }}>
                  Your Name : {curElem.formData.name}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Your Email : {curElem.formData.email}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Your Address : {curElem.formData.address}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Your Number : {curElem.formData.number}
                </p>
              </OrderDetails>
              <OrderItems>
                {curElem.cartData.map((data) => {
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
                          <span
                            style={{ color: "#0077b6", fontWeight: "bold" }}
                          >
                            Name:
                          </span>{" "}
                          <span style={{ color: "#023e8a" }}>{data.name}</span>
                        </h3>
                        <h3>
                          <span
                            style={{ color: "#0077b6", fontWeight: "bold" }}
                          >
                            Color:
                          </span>{" "}
                          <span style={{ color: "#023e8a" }}>{data.color}</span>
                        </h3>
                        <h3>
                          <span
                            style={{ color: "#0077b6", fontWeight: "bold" }}
                          >
                            Quantity:
                          </span>{" "}
                          <span style={{ color: "#023e8a" }}>
                            {data.amount}
                          </span>
                        </h3>
                        <h3>
                          <span
                            style={{ color: "#0077b6", fontWeight: "bold" }}
                          >
                            Per Ps Price:
                          </span>{" "}
                          <span style={{ color: "#023e8a" }}>
                            {data.price} TK
                          </span>
                        </h3>
                      </ItemDetails>
                    </OrderItem>
                  );
                })}
                <OrderItem>
                  <ItemDetails>
                    <h3>
                      <span style={{ color: "blue", fontWeight: "bold" }}>
                        Delivery charge:
                      </span>{" "}
                      70 TK
                    </h3>
                  </ItemDetails>
                </OrderItem>
              </OrderItems>

              <OrderTotal>
                <h3>Total Price {curElem.finalprice} TK</h3>
              </OrderTotal>
              <OrderStatus>
                <h3 style={{ margin: 5 }}>{curElem.status}</h3>
                {/* <h3 style={{ margin: 5 }}>{curElem._id}</h3> */}

                {curElem.status === "Pending" || curElem.status === "Reject" ? (
                  <Button onClick={() => handleDelete(curElem._id)}>
                    Delete
                  </Button>
                ) : (
                  <>
                    <p>
                      You Cannot Delete,because your order is {curElem.status}
                    </p>
                  </>
                )}
              </OrderStatus>
            </OrderContainer>
          );
        })}
      </DashboardBody>
    </DashboardContainer>
  );
};

export default Dashboard;
