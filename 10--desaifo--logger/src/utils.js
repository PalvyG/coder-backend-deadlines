import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import winston from "winston";
import "winston-mongodb";
import 'dotenv/config';
const { combine, printf, timestamp, colorize } = winston.format;

export const __dirname = dirname(fileURLToPath(import.meta.url));


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const newTicketCode = async () => {
  return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
}

const statusHTTP = {
  notFound: 404,
  unauthorized: 401,
  forbidden: 403,
  internalServerError: 500
};

export class HTTPResponse {
  notFound(res, data) {
    return res.status(statusHTTP.notFound).json({
      status: statusHTTP.notFound,
      message: '(!) Data not found.',
      error: data
    });
  };

  unauth(res, data) {
    return res.status(statusHTTP.unauthorized).json({
      status: statusHTTP.unauthorized,
      message: '(!) Your credentials are invalid. Please, use valid credentials.',
      error: data
    });
  };

  forb(res, data) {
    return res.status(statusHTTP.forbidden).json({
      status: statusHTTP.forbidden,
      message: '(!) You are not authorized to access this endpoint.',
      error: data
    });
  };

  intServErr(res, data) {
    return res.status(statusHTTP.internalServerError).json({
      status: statusHTTP.internalServerError,
      message: '(!) Whoops, something went wrong on our end! Please, try again later.',
      error: data
    });
  };
};

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'bold white redBG',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'blue',
    debug: 'magenta',
  }
}

const winTransports = () => {
  if (process.env.PERSISTENCE == 'mdb') {
    if (process.env.ENVIRONMENT == 'dev') {
      const transports = [
        winston.add(
          new winston.transports.MongoDB({
            options: { useUnifiedTopology: true },
            db: process.env.MONGODB_URL,
            collection: "logs",
            tryReconnect: true,
            level: "error",
          })
        ),
        new winston.transports.Console({ level: "debug" }),
      ]
      return transports
    } else if (process.env.ENVIRONMENT == 'prod') {
      const transports = [
        winston.add(
          new winston.transports.MongoDB({
            options: { useUnifiedTopology: true },
            db: process.env.MONGODB_URL,
            collection: "logs",
            tryReconnect: true,
            level: "error",
          })
        ),
        new winston.transports.Console({ level: "info" }),
      ]
      return transports
    }
  } else if (process.env.PERSISTENCE == 'fs') {
    if (process.env.ENVIRONMENT == 'dev') {
      const transports = [
        new winston.transports.Console({ level: "debug" }),
      ]
      return transports
    } else if (process.env.ENVIRONMENT == 'prod') {
      const transports = [
        new winston.transports.Console({ level: "info" }),
        new winston.transports.File({
          filename: "./logs/logs.log",
          level: "error",
        }),
      ]
      return transports
    }
  }
}

const logConfig = {
  transports: winTransports(),
  format: combine(
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    colorize(winston.addColors(customLevels.colors)),
    printf((info) => {
      let spaces = []
      for (let i = info.level.length; i < 17; i++) {
        spaces.push(" ")
      }
      spaces = spaces.join("")
      if (info.level.includes('fatal')) {
        return `${info.level}    | ${[info.timestamp]} | ${info.message}`
      } else return `${info.level} ${spaces} | ${[info.timestamp]} | ${info.message}`
    })
  ),
  levels: customLevels.levels,
};

export const logger = winston.createLogger(logConfig);