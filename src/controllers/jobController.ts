import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import * as jobService from '../services/jobService';
import * as applicationService from '../services/applicationService'; 
import { sendNotification } from '../services/notificationService';

export const createJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: "User tidak dikenali" });
    }

    const newJob = await jobService.createJob(req.body, userId);
    
    res.status(201).json({
      message: "Lowongan kerja berhasil dibuat!",
      data: newJob
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const applyJob = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const jobId = parseInt(req.params.id);

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const application = await applicationService.applyJob(jobId, userId);

    const message = `User ID ${userId} baru saja melamar ke Job ID ${jobId}. Segera proses!`;
    
    sendNotification(message); 

    res.status(201).json({
      message: "Lamaran berhasil dikirim!",
      data: application
    });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getJobApplicants = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const jobId = parseInt(req.params.id);

    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const applicants = await applicationService.getApplicantsByJobId(jobId, userId);

    res.json({
      message: "Data pelamar berhasil diambil",
      total_applicants: applicants.length,
      data: applicants
    });

  } catch (error: any) {
    if (error.message.includes("tidak memiliki akses")) {
      return res.status(403).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};