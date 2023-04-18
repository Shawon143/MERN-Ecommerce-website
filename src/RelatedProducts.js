import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontex";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";
import MyImg from "./components/MyImg";
import useAuth from "./hooks/useAuth";
import { Button } from "./styles/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Review from "./Reviews/Review";
import RelatedProduct from "./RelatedProduct/RelatedProduct";

// const API = "https://mernecommerce-o4jz.onrender.com/products";

const RelatedProducts = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();
  const { admin } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect_url = location.state?.from || "/products";

  const {
    id: alias,
    name,
    company,
    price,
    description,
    stock,
    stars,
    reviews,
    image,

    // imgA,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`https://mernecommerce-o4jz.onrender.com/products/${id}`);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure for you delete this car ?");
    if (confirm) {
      fetch(`https://mernecommerce-o4jz.onrender.com/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            navigate(redirect_url);
          }
        });
    }
  };

  if (isSingleLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            {image ? (
              <MyImage imgs={image} />
            ) : (
              <MyImg product={singleProduct} />
            )}
            {/* <MyImage imgs={image} /> */}
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>
            <Star stars={stars} reviews={reviews} />

            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              {/* <p>
                ID : <span> {alias} </span>
              </p> */}
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr />

            {stock > 0 && <AddToCart product={singleProduct} />}
            <Review products={singleProduct} id={id}></Review>

            {admin ? (
              <>
                <div style={{ margin: 10 }}>
                  <NavLink to={`/update/${id}`} className="navbar-link ">
                    <Button style={{ margin: "0 10px" }}>Update</Button>
                  </NavLink>

                  <Button onClick={() => handleDelete(id)}>Delete</Button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <RelatedProduct
          product={singleProduct}
          brand={company}
        ></RelatedProduct>
      </Container>
    </Wrapper>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 0.2rem solid rgba(0, 0, 0, 0.1);
  border-top-color: #007bff;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: ${spin} 0.6s linear infinite;
`;

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default RelatedProducts;
