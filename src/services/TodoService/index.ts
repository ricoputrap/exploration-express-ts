import { PostgrestResponse } from "@supabase/supabase-js";
import supabase from "../../clients/supabase";
import { NewData, Task } from "../../types/todoapp.types";

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

  

  public async editTask(id: number, newData: NewData): Promise<Task> {
    try {
      const response: PostgrestResponse<Task> = await supabase
        .from("TASK")
        .update(newData)
        .eq('id', id)
        .select()

      if (response.error) {
        throw new Error("Edit task error");
      }

      const editedTask: Task = response.data[0];
      return editedTask;
    }
    catch (error: any) {
      console.error("===== error:", error);
      throw {
        code: 500,
        message: "Edit task error"
      }
    }
  }

  public async deleteTask(id: number): Promise<PostgrestResponse<any>> {
    try {
      const response: PostgrestResponse<any> = await supabase
        .from("TASK")
        .delete()
        .eq('id', id);

      if (response.error) throw new Error("Delete task error");

      return response;
    }
    catch (error: any) {
      console.error("===== error:", error);
      throw {
        code: 500,
        message: "Delete task error"
      }
    }
  }
}

export default TodoService;