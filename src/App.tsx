import React from "react";
import { Route, Switch } from "react-router";
import Home from "./pages/Home/Home.page";
import Header from "./components/Header/Header.component";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useStore } from "./providers/Store.provider";
import { observer } from "mobx-react-lite";
import Statistics from "./pages/Statistics/Statistics.page";

function App() {
  const store = useStore();

  return (
    <ThemeProvider theme={store.theme.current}>
      <CssBaseline />
      <Header />

      <Switch>
        <Route exact path={"/"}>
          <Home />
        </Route>

        <Route exact path={"/statistics"}>
          <Statistics />
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default observer(App);
