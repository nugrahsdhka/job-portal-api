import { Router } from 'express';
import * as jobController from '../controllers/jobController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authenticateToken, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.post('/:id/apply', authenticateToken, jobController.applyJob);
router.get('/:id/applicants', authenticateToken, jobController.getJobApplicants);

export default router;