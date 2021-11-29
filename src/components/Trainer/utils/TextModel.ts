import { makeAutoObservable } from "mobx";

class TrainerTextModel {
  readonly content: string;

  _currentIndex = 0;

  _lastChar = "";
  _isLastCharMatched = true;

  isFinished = false;

  constructor(text = "") {
    this.content = text;
    makeAutoObservable(this);
  }

  input = (char: string) => {
    this.handleNewChar(char);
    this.advanceIf(this.isLastCharMatched);
    this.ensureFinish();
    return this.isLastCharMatched;
  };

  handleNewChar = (char: string) => {
    this._lastChar = char;
    const wanted = this.currentChar;
    this._isLastCharMatched = char === wanted;
  };

  acceptInput = () => {
    this.advance();
  };

  ensureFinish = () => {
    if (this.currentIndex === this.content.length) {
      this.isFinished = true;
    }
  };

  get currentChar() {
    return this.content[this.currentIndex];
  }

  advanceIf = (condition: boolean) => {
    if (condition) {
      this.advance();
    }
  };

  advance = () => this._currentIndex++;

  get currentIndex() {
    return this._currentIndex;
  }

  get lastChar() {
    if (this._lastChar === " ") return "Space";
    return this._lastChar;
  }

  get isLastCharMatched() {
    return this._isLastCharMatched;
  }
}

export default TrainerTextModel;
