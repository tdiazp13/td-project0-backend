import {Router} from 'express';

const router = Router();

/* GET users listing. */
router.get('/', function(req: any, res: any) {
  res.send('respond with a ppo');
});

export default router;