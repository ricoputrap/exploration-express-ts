import { PostgrestResponse } from "@supabase/supabase-js";
import { Express, Request, Response, NextFunction } from "express"
import { TODO_URL_V1 } from "../..";
import TodoService from "../../../services/TodoService"
import { NewData, Task } from "../../../types/todoapp.types";

const TodoAPI = (app: Express) => {
  const URL = TODO_URL_V1 + "/tasks";
  const service = new TodoService();

  app.get(URL, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks: Task[] = await service.getAllTasks();
      return res.status(200).json({
        data: tasks
      })
    }
    catch (err: any) {
      return err;
    }
  });

  app.post(URL, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const response: PostgrestResponse<any> = await service.createNewTask(body.title);
      return res.status(200).json(response);
    }
    catch (err: any) {
      return err;
    }
  });

  app.put(`${URL}/:id`, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskID: any = req.params.id;

      const body = req.body;
      const newData: NewData = {};
      if (body.title) newData.title = body.title;
      if (body.completed) newData.completed = body.completed;

      const editedTask: Task = await service.editTask(taskID, newData);
      return res.status(200).json(editedTask);
    }
    catch (err: any) {
      return err;
    }
  })
}

export default TodoAPI;