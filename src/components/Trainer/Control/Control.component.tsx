import React, { ReactNode } from "react";
import { Box, Paper } from "@mui/material";

type ControlProps = {
  children: ReactNode;
};

const Control = ({ children }: ControlProps) => {
  return (
    <Paper>
      <Box
        py={1}
        px={3}
        height={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Control;
