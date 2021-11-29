import { CharState } from "../Trainer.types";
import { computedFn } from "mobx-utils";
import { flowResult, makeAutoObservable } from "mobx";
import FishTextAPI, {
  FishTextAPIResponse,
} from "../../../utils/api/FishTextAPI";
import TrainerStatistics from "./Statistics";
import TrainerTextModel from "./TextModel";
import IntervalTimer from "./IntervalTimer";

export enum SessionStatus {
  Pending,
  Active,
  Error,
}

export type FinishHandler = (() => void) | undefined;

export class TrainerSessionObservable {
  status: SessionStatus = SessionStatus.Pending;
  model = new TrainerTextModel();
  statistics = new TrainerStatistics();

  timer = new IntervalTimer();

  beforeFinish: FinishHandler = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public start = () => {
    this.reset(SessionStatus.Pending);

    const request = flowResult(this.fetchFishText());

    request.then((res) => {
      if (!res) {
        this.reset(SessionStatus.Error);
        return;
      }

      this.setActive(res);
    });
  };

  public finish = () => {
    alert(
      "Финиш!\nСтатистику по сессии Вы можете посмотреть на странице статистики."
    );
    this.beforeFinish?.();
    this.reset(SessionStatus.Pending);
  };

  public *fetchFishText() {
    try {
      const sentencesToFetch = 2;
      const api = new FishTextAPI();
      const response: FishTextAPIResponse = yield api.getFishText({
        number: sentencesToFetch,
      });

      return response.text;
    } catch (e) {
      return null;
    }
  }

  public processInput = (char: string) => {
    const isMatched = this.model.input(char);
    const isFinished = this.model.isFinished;

    if (isMatched) {
      this.statistics.accuracy.raise();
      this.statistics.chars.increment();
    } else {
      this.statistics.accuracy.lower();
    }

    if (isFinished) {
      this.finish();
    }
  };

  public setActive = (text: string) => {
    this.model = new TrainerTextModel(text);
    this.statistics.reset();
    this.timer.run(this.statistics.chars.tick, 1000);
    this.status = SessionStatus.Active;
  };

  public currentCharState = computedFn((index: number) => {
    if (index === this.model.currentIndex)
      return this.model.isLastCharMatched ? CharState.Active : CharState.Error;

    return index > this.model.currentIndex
      ? CharState.Pending
      : CharState.Passed;
  });

  public reset = (status: SessionStatus) => {
    this.model = new TrainerTextModel();
    this.statistics.reset();
    this.timer.stop();
    this.status = status;
  };
}
