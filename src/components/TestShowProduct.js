import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const TestShowProduct = (curElem) => {
  const { _id, name, img, price, category } = curElem;
  return (
    <NavLink to={`/singletest/${_id}`}>
      <div className="card">
        <figure>
          <img src={img} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price} />}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default TestShowProduct;
