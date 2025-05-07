import { globalErrorhandler } from "../middlewares/GlobalErrorHandler";
import { AppError } from "../utils/AppError"
import { AppDataSource } from "./data-source"
import{ Request, Response, NextFunction } from "express";
import * as express from "express";


AppDataSource.initialize().then(async () => {
    console.log("Database connected")
    const app = express();

    app.get("/", (req: Request, res: Response) => {
        res.send("Working fine");
      });

      // Handling unhandled routes
    app.all('/*splat', (req: Request, res: Response, next:NextFunction) => {
        next(new AppError(404, `Route ${req.originalUrl} not found`));
      });

    // global error handler
    app.use(globalErrorhandler)

    app.listen(3000, () => {
        console.log("Server started on port 3000")
    })
}).catch(error => console.log(error))
