import { makeAutoObservable } from "mobx";

interface IStatistics {
  reset(): void;
}

export class AccuracyStatistics implements IStatistics {
  public _checkedChars = 0;
  public _missedChars = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public calculate = () => {
    const result =
      this._checkedChars / (this._checkedChars + this._missedChars);
    return isFinite(result) ? result : 1;
  };

  public raise = () => this._checkedChars++;
  public lower = () => this._missedChars++;

  public get formatted() {
    const accuracyInPercent = this.calculate() * 100;
    return Math.round(accuracyInPercent) + "%";
  }

  public reset = () => {
    this._checkedChars = 0;
    this._missedChars = 0;
  };
}

export class CharsStatistics implements IStatistics {
  public _passedSeconds = 0;
  public _totalChars = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public reset = () => {
    this._totalChars = 0;
  };

  public tick = (passedSeconds = 1) => {
    this._passedSeconds += passedSeconds;
  };

  public increment = () => {
    this._totalChars++;
  };

  get perSecond() {
    const result = this._totalChars / this._passedSeconds;
    return isFinite(result) ? result : 0;
  }

  get perMinute() {
    return this.perSecond * 60;
  }
}

class TrainerStatistics implements IStatistics {
  public accuracy = new AccuracyStatistics();
  public chars = new CharsStatistics();

  constructor() {
    makeAutoObservable(this);
  }

  public reset() {
    this.accuracy.reset();
    this.chars.reset();
  }
}

export default TrainerStatistics;
