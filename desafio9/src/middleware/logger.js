const winston  = require("winston")


const customLevelOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4,
    },
    colors:{
        fatal:"red",
        error:"orange",
        warning:"yellow",
        info:"blue",
        debug:"white",
    }
}
 const logger = winston.createLogger({

    levels:customLevelOptions.levels,
    transports:[
        
        new winston.transports.Console({
            level:"fatal",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level:"error",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level:"warning",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level:"info",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.Console({
            level:"debug",
            format:winston.format.combine(
                winston.format.colorize({colors:customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:`./errors.log`,
            
            format:winston.format.simple()
        }),
    ]
 })

const addLogger = (req,res,next)=>{
req.logger = logger;

next();
 }

 module.exports = {addLogger}