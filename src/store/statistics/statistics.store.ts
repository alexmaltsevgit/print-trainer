import { makeAutoObservable } from "mobx";
import { IStore } from "../types";
import {
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  LocalStorageKeys,
} from "../../utils/localStorage";
import { SessionInfo } from "./statistics.types";

export class StatisticsStore implements IStore {
  sessions: Array<SessionInfo> = getObjectFromLocalStorage(
    LocalStorageKeys.Sessions,
    []
  );

  constructor() {
    makeAutoObservable(this);
  }

  addSessionInfo = (info: SessionInfo) => {
    this.sessions.push(info);
    // update local storage
    addObjectToLocalStorage(LocalStorageKeys.Sessions, this.sessions);
  };
}
