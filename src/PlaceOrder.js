import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import useAuth from "./hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();
  const { user } = useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const redirect_url = location.state?.from || "/dashboard";

  const userEmail = user.email;
  const statuscode = "Pending";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const finalCart = {
      email: userEmail,
      formData: data,
      cartData: cart,
      finalprice: total_price + shipping_fee,
      status: statuscode,
    };
    const confirm = window.confirm("Are you confirm for your order  ?");
    if (confirm) {
      axios
        .post("http://localhost:7000/cart", finalCart)
        .then((response) => {
          if (response.data.insertedId) {
            alert("Order Successfully");
            reset();
            clearCart();
            navigate(redirect_url);
          }
          // Update the UI as needed based on the response
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Send the cart data to the backend using Axios
  };

  /*  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post("http://localhost:7000/cart", data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Added Successfully");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <div>
      <FormContainer>
        <FormHeader>Place order</FormHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            {...register("name", { required: true })}
            placeholder="Your Name"
          />
          <FormInput
            {...register("email")}
            value={userEmail}
            placeholder="Your Email"
            readOnly
          />
          <FormInput
            {...register("address", { required: true })}
            placeholder="Your Address"
          />
          <FormInput
            type="number"
            {...register("number", { required: true })}
            placeholder="Your phone number"
          />
          <FormSubmitButton type="submit" value="Submit" />
        </Form>
      </FormContainer>
    </div>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormHeader = styled.h3`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: black;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-bottom: 2rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 0.25rem;
`;

const FormLabel = styled.label`
  margin: 1rem 0;
  color: black;
  font-size: 18px;
`;

const FormSubmitButton = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0062cc;
  }
`;

export default PlaceOrder;
