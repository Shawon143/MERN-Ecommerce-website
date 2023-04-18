import React from "react";
import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";
// import FormatPrice from "../Helpers/FormatPrice";

const ReletedSingle = (curElem) => {
  const { _id, name, image, imgA, price, category } = curElem;
  return (
    <NavLink to={`/singleproduct/${_id}/related`}>
      <div className="card">
        <figure>
          {image ? (
            <img src={image[0].url} alt={name} />
          ) : (
            <img src={imgA} alt={name} />
          )}

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

export default ReletedSingle;
