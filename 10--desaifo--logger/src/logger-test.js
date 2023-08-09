import winston from "winston"
const { combine, printf, timestamp, colorize } = winston.format;

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

const winTest = () => {
    const logConfig = {
        transports: [new winston.transports.Console()],
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
                } else return `${info.level} ${spaces} | ${[info.timestamp]} | ${info.message}`})
        ),
        levels: customLevels.levels,
    };

    const logger = winston.createLogger(logConfig);

    logger.level = 'debug';

    logger.debug('mensaje con nivel debug');
    logger.http('mensaje con nivel http');
    logger.info('mensaje con nivel info');
    logger.warning('mensaje con nivel warning');
    logger.error('mensaje con nivel error');
    logger.fatal('mensaje con nivel fatal');
}

winTest()