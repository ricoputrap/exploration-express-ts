import supabase from "../../clients/supabase";
import { Task } from "../../types/todoapp.types";

class TodoService {
  public async getAllTasks(): Promise<Task[]> {
    try {
      const response = await supabase.from("TASK").select("*"); 
      
      if (response.error) {
        throw new Error("ERROR");
      }

      const tasks: Task[] = response.data;
      return tasks;
    }
    catch (err: any) {
      throw {
        code: 500,
        message: "Get all tasks error"
      }
    }
  }
}

export default TodoService;