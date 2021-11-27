import { API_NAME } from "../../config/constants";
import clogger = require("node-color-log");

class Logger {
  private apiName: string;

  constructor(apiName: string) {
    this.apiName = apiName;
  }

  private getCurrentTime(): string {
    const d = new Date();
    let datetext = d.toTimeString();

    datetext = datetext.split(" ")[0];

    return `[${datetext}]`;
  }

  info(message: string) {
    clogger
      .color("yellow")
      .bold()
      .italic()
      .dim()
      .log(`${this.getCurrentTime()} ${this.apiName}: ${message}`);
  }

  happy(message: string) {
    clogger
      .color("cyan")
      .bold()
      .italic()
      .dim()
      .log(`${this.getCurrentTime()} ${this.apiName}: ${message}`);
  }

  log(message: string) {
    clogger
      .color("green")
      .bold()
      .italic()
      .dim()
      .log(`${this.getCurrentTime()} ${this.apiName}: ${message}`);
  }

  error(error: Error) {
    clogger
      .color("red")
      .bold()
      .italic()
      .dim()
      .log(`${this.getCurrentTime()} ${this.apiName}: ${error}`);
  }

  softError(error: string) {
    clogger
      .color("magenta")
      .bold()
      .italic()
      .dim()
      .log(`${this.getCurrentTime()} ${this.apiName}: ${error}`);
  }
}

export const logger = new Logger(API_NAME);
