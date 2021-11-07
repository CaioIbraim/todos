import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res : NextApiResponse) => {
  try {
    const { id, status } = req.body    

    const prisma = new PrismaClient()

    const newTodo = await prisma.todo.delete({
      where:{id: id},
    })

    res.status(200).json(newTodo)
  } catch (error) {
    res.status(500).json(error)
  }

}
