import React from "react";
import { Container, Stack } from "@mui/material";
import Trainer from "../../components/Trainer/Trainer.component";

const Home = () => {
  return (
    <Container>
      <Stack mt={10}>
        <Trainer />
      </Stack>
    </Container>
  );
};

export default Home;
