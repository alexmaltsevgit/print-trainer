class IntervalTimer {
  private interval: number | null = null;

  public run = (handler: TimerHandler, timeout: number) => {
    this.interval = setInterval(handler, timeout);
  };

  public stop = () => {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.interval = null;
  };
}

export default IntervalTimer;
