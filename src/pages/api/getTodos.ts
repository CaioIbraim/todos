import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res : NextApiResponse) => {
  try {
    const prisma = new PrismaClient()
    const todos = await prisma.todo.findMany()
    res.status(200).json({todos})
  } catch (error) {
    res.status(500).json(error)
  }

}
