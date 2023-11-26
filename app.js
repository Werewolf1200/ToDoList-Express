import express from "express";
import path from "path";
import { fileURLToPath } from "url"
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import taskController from "./controllers/taskController.js";
import errorController from "./controllers/errorController.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.set("views", path.join(__dirname, "views")); // Indica carpeta de las Vistas
app.set("view engine", "pug");// Indica el template Engine

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", taskController.getAllTasks);
app.get("/add", taskController.getAddTaskForm);
app.post("/add", taskController.addTask);
app.get("/edit/:id", taskController.getEditTaskForm);
app.get("/edit/:id", taskController.editTask);
app.get("/complete/:id", taskController.completeTask);
app.get("/uncomplete/:id", taskController.uncompleteTask);
app.get("/delete/:id", taskController.deleteTask);

app.use(errorController.error404)

app.listen(port, () => {
   console.log(`La aplicacion está funcionando en http://localhost:${port}`)  
});