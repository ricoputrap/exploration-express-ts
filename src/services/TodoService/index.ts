import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../clients/supabase";
import { Task } from "../../types/todoapp.types";

class TodoService {
  public async getAllTasks(): Promise<Task[]> {
    try {
      const response: PostgrestResponse<any> = await supabase.from("TASK").select("*"); 
      
      if (response.error) {
        throw new Error("Get all tasks error");
      }

      const tasks: Task[] = response.data;
      return tasks;
    }
    catch (error: any) {
      console.error("===== error:", error);
      throw {
        code: 500,
        message: "Get all tasks error"
      }
    }
  }

  public async createNewTask(title: string): Promise<PostgrestResponse<any>> {
    try {
      const response: PostgrestResponse<any> = await supabase.from("TASK").insert({ title });

      if (response.error) {
        throw new Error("Create a new task error");
      }
      
      return response;
    }
    catch (error: any) {
      console.error("===== error:", error);
      throw {
        code: 500,
        message: "Create new task error"
      }
    }
  }
}

export default TodoService;