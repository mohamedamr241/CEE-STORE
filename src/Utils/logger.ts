import {createLogger, transports, format} from 'winston';

const logging = createLogger({
    transports:[
        new transports.File({
            filename:'logs',
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'logs-error',
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),

    ]
})

export default logging;