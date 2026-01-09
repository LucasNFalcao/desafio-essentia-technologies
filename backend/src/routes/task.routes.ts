import { Router } from 'express'
import { TaskController } from '../controllers/TaskController'

const routes = Router()
const taskController = new TaskController()

routes.get('/tasks', taskController.index)
routes.post('/tasks', taskController.store)
routes.put('/tasks/:id', taskController.update)
routes.patch('/tasks/:id/status', taskController.toggle)
routes.delete('/tasks/:id', taskController.delete)

export default routes
