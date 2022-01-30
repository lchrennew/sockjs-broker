import { config } from 'dotenv-flow'
import getLogger from './logger/index.js';

config()

const logger = getLogger('index.js')

logger.info(`-- ENVIRONMENTS --`)
logger.info(Object.entries(process.env).map(x => x.join('\t\t=\t')).join('\r\n'))
