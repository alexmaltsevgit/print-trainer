import { StatisticsStore } from "./statistics/statistics.store";
import { ThemeStore } from "./theme/theme.store";

const store = {
  statistics: new StatisticsStore(),
  theme: new ThemeStore(),
};

export type AppState = typeof store;

export default store;
