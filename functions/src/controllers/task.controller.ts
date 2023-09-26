import { Request, Response } from "express";
import { db } from "../config/firebase";
import ITask from "../models/task";
import constants from "../utils/constants";
import functions from "../utils/functions";

const PostCreateTask = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    const newTask: ITask = {
      title: body.title,
      description: body.description,
      status: constants.PENDING_TASK,
      created_date: new Date(),
    };
    await db.collection("task").doc().create(newTask);

    return res.status(200).send({
      success: true,
      message: "Task was created successfully",
    });
  } catch (err: any) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const GetListTask = async (req: Request, res: Response) => {
  try {
    let query = db.collection("task");
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const tasks: ITask[] = docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      status: doc.data().status,
      created_date: doc.data().created_date,
      modified_date: doc.data().modified_date,
    }));

    res.status(200).send({
      success: true,
      payload: tasks,
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const PutEditTask = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (!functions.ValidateCorrectStatus(body.status)) {
      res.status(400).send({
        success: false,
        message: "Status is not the correct.",
      });
    }
    body.modified_date = new Date();

    const document = db.collection("task").doc(body.id);
    await document.update(body);

    res.status(200).send({
      success: true,
      payload: "Task was updated successfully",
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const DeleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  try {
    const doc = db.collection("task").doc(taskId);
    await doc.delete();
    res.status(200).send({
      success: true,
      payload: "Task was removed successfully",
    });
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export default {
  PostCreateTask,
  GetListTask,
  PutEditTask,
  DeleteTask,
};
