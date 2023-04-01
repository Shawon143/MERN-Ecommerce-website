import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/productcontex";
import styled from "styled-components";

const Update = () => {
  const { id } = useParams();
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const { register, handleSubmit, reset } = useForm();
  const [selectedColors, setSelectedColors] = useState([]);
  const [color, setColor] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/color")
      .then((res) => res.json())
      .then((data) => {
        setColor(data);
      });
  }, []);

  const handleColorChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions);
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedColors(selectedValues);
  };

  const {
    id: alias,
    name,
    company,
    price,
    description,
    stock,

    category,
    imgA,
    imgB,
    imgC,
    imgD,

    // imgA,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`http://localhost:7000/products/${id}`);
  }, []);

  const updatehandle = (e) => {
    const url = `http://localhost:7000/products/${id}`;
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
      });
  };

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }
  return (
    <FormContainer>
      <FormHeader>ADD A CAR</FormHeader>
      <Form onSubmit={handleSubmit(updatehandle)}>
        <FormInput {...register("id")} placeholder="id" value={alias} />
        <FormInput
          {...register("name")}
          defaultValue={name}
          placeholder="name"
        />
        <FormInput
          {...register("company")}
          placeholder="company"
          defaultValue={company}
        />
        <FormInput
          {...register("price")}
          placeholder="price"
          type="number"
          defaultValue={price}
        />
        <FormInput
          {...register("description")}
          placeholder="description"
          defaultValue={description}
        />
        <FormInput
          {...register("category")}
          placeholder="catagory"
          defaultValue={category}
        />
        <FormInput
          {...register("imgA")}
          placeholder="imgA"
          defaultValue={imgA}
        />
        <FormInput
          {...register("imgB")}
          placeholder="imgB"
          defaultValue={imgB}
        />
        <FormInput
          {...register("imgC")}
          placeholder="imgC"
          defaultValue={imgC}
        />
        <FormInput
          {...register("imgD")}
          placeholder="imgD"
          defaultValue={imgD}
        />
        <FormInput
          {...register("stock")}
          placeholder="stock"
          type="number"
          defaultValue={stock}
        />
        <FormLabel htmlFor="colors">Colors:</FormLabel>
        <FormSelect
          id="colors"
          name="colors"
          multiple
          onChange={handleColorChange}
          {...register("colors")}
        >
          {color.map((curElem) => {
            return (
              <option
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                value={curElem.ColorName}
              >
                {curElem.ColorName}
              </option>
            );
          })}
        </FormSelect>
        <FormSubmitButton type="submit" value="Submit" />
      </Form>
    </FormContainer>
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

export default Update;
