import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";

const AddColor = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:7000/color", data)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Added Successfully");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <FormHeader>ADD A COLOR</FormHeader>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-control mb-3"
          {...register("ColorName", { required: true })}
          placeholder="ColorName"
        />
        <input
          className="form-control mb-3"
          {...register("ColorCode", { required: true })}
          placeholder="ColorCode"
        />

        <input type="submit" />
      </form>
    </div>
  );
};

const FormHeader = styled.h3`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: black;
`;

export default AddColor;
