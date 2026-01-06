import { Request, Response } from 'express'
import { AppDataSource } from '../database/data-source'
import { Task } from '../entities/Task'

export class TaskController {
  async index(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Task)
    return res.json(await repo.find())
  }

  async store(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Task)
    const task = repo.create(req.body)
    await repo.save(task)
    return res.status(201).json(task)
  }

  async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Task)
    await repo.update(req.params.id, req.body)
    return res.sendStatus(204)
  }

  async toggle(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Task)
    const task = await repo.findOneBy({ id: Number(req.params.id) })

    if (!task) return res.sendStatus(404)

    task.completed = !task.completed
    await repo.save(task)
    return res.json(task)
  }

  async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Task)
    await repo.delete(req.params.id)
    return res.sendStatus(204)
  }
}
