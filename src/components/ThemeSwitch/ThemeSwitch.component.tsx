import React from "react";
import { Box, Switch, Typography } from "@mui/material";
import { useStore } from "../../providers/Store.provider";
import { Theme } from "../../themes/types";
import { observer } from "mobx-react-lite";

const ThemeSwitch = () => {
  const store = useStore();
  const mode = store.theme.mode;
  const checked = mode === Theme.Dark;

  return (
    <Box display={"flex"} alignItems={"center"}>
      <Typography variant={"h6"} component={"span"}>
        Сменить тему
      </Typography>
      <Switch checked={checked} onChange={store.theme.change} />
    </Box>
  );
};

export default observer(ThemeSwitch);
