import log4js from 'log4js'

export default function getLogger(category = null, level = 'debug') {
    const logger = log4js.getLogger(category)
    logger.level = level
    return logger
}

