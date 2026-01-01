import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const applyJob = async (jobId: number, applicantId: number) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId }
  });
  
  if (!job) throw new Error("Pekerjaan tidak ditemukan!");

  const existingApplication = await prisma.application.findFirst({
    where: {
      jobId: jobId,
      applicantId: applicantId
    }
  });

  if (existingApplication) {
    throw new Error("Anda sudah melamar pekerjaan ini sebelumnya.");
  }

  return await prisma.application.create({
    data: {
      jobId,
      applicantId
    }
  });
};

export const getApplicantsByJobId = async (jobId: number, userId: number) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId }
  });

  if (!job) throw new Error("Pekerjaan tidak ditemukan!");

  if (job.employerId !== userId) {
    throw new Error("Anda tidak memiliki akses untuk melihat pelamar pekerjaan ini!");
  }

  return await prisma.application.findMany({
    where: { jobId: jobId },
    include: {
      applicant: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    }
  });
};