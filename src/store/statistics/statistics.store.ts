import { makeObservable, observable } from "mobx";
import { IStore } from "../types";

export class StatisticsStore implements IStore {
  speedRecord = 0;

  constructor() {
    makeObservable(this, {
      speedRecord: observable,
    });
  }
}
