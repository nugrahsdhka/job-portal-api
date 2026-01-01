import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JobInput {
  title: string;
  description: string;
  companyName: string;
  location: string;
  salary: number;
}

export const createJob = async (data: JobInput, userId: number) => {
  return await prisma.job.create({
    data: {
      ...data,
      employerId: userId 
    }
  });
};

export const getAllJobs = async () => {
  return await prisma.job.findMany({
    include: {
      employer: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
};