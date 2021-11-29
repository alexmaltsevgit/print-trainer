import { IStore } from "../types";
import { makeAutoObservable } from "mobx";
import { Theme } from "../../themes/types";
import lightTheme from "../../themes/light";
import darkTheme from "../../themes/dark";
import Cookies from "js-cookie";
import { CookiesKeys, cookiesMaxExpirationDate } from "../../utils/cookies";

export class ThemeStore implements IStore {
  mode: Theme = (Cookies.get(CookiesKeys.Theme) as Theme) ?? Theme.Light;

  constructor() {
    makeAutoObservable(this);
  }

  get current() {
    return this.mode === Theme.Light ? lightTheme : darkTheme;
  }

  set = (theme: Theme) => {
    Cookies.set(CookiesKeys.Theme, theme, {
      expires: cookiesMaxExpirationDate,
    });

    this.mode = theme;
  };

  change = () => {
    this.mode === Theme.Light ? this.set(Theme.Dark) : this.set(Theme.Light);
  };
}
