import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AddColor from "./AddColor";
import styled from "styled-components";

const AddCar = () => {
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

  const onSubmit = (data) => {
    // console.log(data);
    axios
      .post("http://localhost:7000/products", data)
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
    <FormContainer>
      <FormHeader>ADD A CAR</FormHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput {...register("id", { required: true })} placeholder="id" />
        <FormInput
          {...register("name", { required: true })}
          placeholder="name"
        />
        <FormInput
          {...register("company", { required: true })}
          placeholder="company"
        />
        <FormInput
          {...register("price", { required: true })}
          placeholder="price"
          type="number"
        />
        <FormInput
          {...register("description", { required: true })}
          placeholder="description"
        />
        <FormInput
          {...register("category", { required: true })}
          placeholder="catagory"
        />
        <FormInput
          {...register("imgA", { required: true })}
          placeholder="imgA"
        />
        <FormInput
          {...register("imgB", { required: true })}
          placeholder="imgB"
        />
        <FormInput
          {...register("imgC", { required: true })}
          placeholder="imgC"
        />
        <FormInput
          {...register("imgD", { required: true })}
          placeholder="imgD"
        />
        <FormInput
          {...register("stock", { required: true })}
          placeholder="stock"
          type="number"
        />
        <FormLabel htmlFor="colors">Colors:</FormLabel>
        <FormSelect
          id="colors"
          name="colors"
          multiple
          onChange={handleColorChange}
          {...register("colors", { required: true }, { required: true })}
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
                value={curElem.ColorCode}
              >
                {curElem.ColorName}
              </option>
            );
          })}
        </FormSelect>
        <FormSubmitButton type="submit" value="Submit" />
      </Form>
      <AddColor />
    </FormContainer>
  );
};

export default AddCar;
