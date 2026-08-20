import { Router } from 'express';

import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/sessionController.js';

import { authenticate } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { validateSession } from '../middlewares/validateSession.js';

const router = Router();

router.post(
  '/',
  authenticate,
  authorize('Trainer'),
  validateSession,
  createSession
);

router.get(
  '/',
  getSessions
);

router.get(
  '/:sessionId',
  getSessionById
);

router.patch(
  '/:sessionId',
  authenticate,
  authorize('Trainer'),
  updateSession
);

router.delete(
  '/:sessionId',
  authenticate,
  authorize('Trainer'),
  deleteSession
);

export default router;