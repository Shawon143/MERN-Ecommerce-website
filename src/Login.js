import React from "react";
// import { useLocation, useHistory } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Button } from "./styles/Button";
import { useLocation, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router";
import styled from "styled-components";

const Login = () => {
  const { signInUsingGoogle, setIsLoading, logOut, user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const redirect_url = location.state?.from || "/";

  // const redirect_url = location.state?.from || "/home";

  const handleGoogleLogin = () => {
    signInUsingGoogle()
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName);
        navigate(redirect_url);
        alert("login successfull");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveUser = (email, displayName) => {
    const user = { email, displayName };
    fetch("http://localhost:7000/users", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  return (
    <Container>
      {/* <button onClick={handleClick}>Go to new location</button> */}
      <Paragraph>{user.email}</Paragraph>
      {user.email ? (
        <Button onClick={logOut}>logout</Button>
      ) : (
        <Button onClick={handleGoogleLogin}>Google Sign in</Button>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 1rem 0;
`;

export default Login;
