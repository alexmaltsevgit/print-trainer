import React from "react";
import { AppBar, Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch.component";
import { linkStyles, stackStyles } from "./Header.styles";

const Header = () => {
  return (
    <AppBar position={"static"}>
      <Container>
        <Stack {...stackStyles}>
          <Link {...linkStyles} component={RouterLink} to={"/"}>
            <Typography variant={"h4"} component={"span"}>
              Главная
            </Typography>
          </Link>

          <Link {...linkStyles} component={RouterLink} to={"/statistics"}>
            <Typography variant={"h4"} component={"span"}>
              Статистика
            </Typography>
          </Link>

          <ThemeSwitch />
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Header;
