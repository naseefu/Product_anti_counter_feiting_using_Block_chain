import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import bgImg from "../../img/pexels-rdne-8369598.jpg";
import heroImg from "../../img/pexels-rdne-8369598.jpg";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const ButtonContainer = styled(Box)({
    display: "flex",
    gap: "1rem",
  });

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`, // Add background image
        backgroundColor: "#FDF5DF",
        minHeight: "95vh",
        backgroundSize: "cover",
      }}
    >
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "2" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "28px",
                color: "#5EBEC4",
                fontWeight: "500",
                mt: 1,
                mb: 4,
              }}
            >
              Welcome to ForgeryBlock
            </Typography>
            <Title variant="h1">
              Securely Authenticate Your Products with ForgeryBlock
            </Title>
            <Typography variant="body2" sx={{ fontSize: "18px", my: 4 }}>
              Our blockchain-based product identification system provides a
              secure and reliable way to authenticate your products and protect
              against fraud.
            </Typography>
            <ButtonContainer>
              <Link to="/scanner">
                <CustomButton
                  backgroundColor="#5EBEC4"
                  color="#fff"
                  buttonText="Scan QR"
                  heroBtn={true}
                />
              </Link>

              <Link to="/login">
                {/* Adjust the link path accordingly */}
                <CustomButton
                  backgroundColor="#1976d2" // Adjust the button color as needed
                  color="#fff"
                  buttonText="Login"
                />
              </Link>
            </ButtonContainer>
          </Box>

          {/* <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box> */}
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
