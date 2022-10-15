import { Express, Request, Response } from "express";
import TodoAPI from "./api/todoapp/v1/TodoAPI";

const expressApp = (app: Express) => {
  TodoAPI(app);
}

export default expressApp;