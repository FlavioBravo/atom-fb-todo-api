import * as functions from 'firebase-functions';
import * as express from "express";
import * as cors from "cors";

const app = express();

//Routes
import TaskRoutes from "./routes/task.routes";

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes Implements
app.use("/api", TaskRoutes);

app.get("/", (req, res) => {
  return res.send(`The API is working now`);
});

exports.app = functions.https.onRequest(app);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
