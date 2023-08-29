import { Router } from 'express';
import { winlog } from '../../loggers/loggers.js';

const router = Router();

router.get('/', (req, res) => {
    winlog.debug('Message. TYPE: "debug".')
    winlog.http('Message. TYPE: "http".')
    winlog.info('Message. TYPE: "info".')
    winlog.warning('Message. TYPE: "warning".')
    winlog.error('Message. TYPE: "error".')
    winlog.fatal('Message. TYPE: "fatal".')
    res.status(200).json({
        message: '(i) Mock logs sent to console',
        tip: '(i) If environment is set to production ("prod"), check "src/logs" to see error and fatal logs.'
    })
})

export default router