import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Reviews from "./Reviews";

const Review = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Button onClick={handleShowModal}>Submit Reviews</Button>
      {showModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Reviews</ModalTitle>
              <button onClick={handleCloseModal}>X</button>
            </ModalHeader>
            <ModalBody>
              <Reviews product={props.products} id={props.id} />
            </ModalBody>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalBody = styled.div`
  margin: 0;
`;

export default Review;
