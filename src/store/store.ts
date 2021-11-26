import { StatisticsStore } from "./statistics/statistics.store";

const store = {
  statistics: StatisticsStore,
};

export type AppState = typeof store;

export default store;
