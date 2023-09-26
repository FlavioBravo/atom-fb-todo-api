import { Router } from "express";
import taskController from "../controllers/task.controller";

const router = Router();

router.post("/task/add-task", taskController.PostCreateTask);
router.get("/task", taskController.GetListTask);
router.put("/task/edit-task", taskController.PutEditTask);
router.delete("/task/delete-task/:taskId", taskController.DeleteTask);

export default router;
