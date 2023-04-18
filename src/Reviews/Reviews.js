import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Reviews = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const userName = user.displayName;
  const id = props.id;

  const onSubmit = (data) => {
    const formdata = {
      productID: id,
      reveiwsData: data,
    };
    console.log(data);
    axios.post("http://localhost:7000/reviews", formdata).then((res) => {
      if (res.data.insertedId) {
        alert("Added Successfully");
        reset();
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-2 w-50 mx-auto">
        <input
          className="form-control mb-3"
          {...register("name", { required: true, maxLength: 20 })}
          placeholder="Your name"
          value={userName}
        />

        <input
          className="form-control mb-3"
          {...register("CarName", { required: true })}
          placeholder="Your name"
          value={props?.product?.name}
          readOnly
        />

        <textarea
          className="form-control mb-3"
          {...register("details")}
          placeholder="Your Review"
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default Reviews;
