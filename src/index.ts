import { globalErrorhandler } from "./utils/GlobalErrorHandler";
import { AppError } from "../utils/AppError"
import { AppDataSource } from "./data-source"
import{ Request, Response, NextFunction } from "express";
import * as express from "express";
import * as dotenv from 'dotenv';
import AuthRoutes from "../src/routes/auth.routes"
import * as cookieParser from "cookie-parser";
dotenv.config();
const port = process.env.PORT

AppDataSource.initialize().then(async () => {
    console.log("Database connected")
    
    const app = express();
    app.use(cookieParser())
    
    app.use(express.json()); 

    app.get("/", (req: Request, res: Response) => {
        res.send("Working fine");
      });

      app.use("/auth",AuthRoutes)

      // Handling unhandled routes
    app.all('/*splat', (req: Request, res: Response, next:NextFunction) => {
        next(new AppError(404, `Route ${req.originalUrl} not found`));
      });

    // global error handler
    app.use(globalErrorhandler)

    app.listen(port, () => {
        console.log(`Server started on port ${port} `)
    })
}).catch(error => console.log(error))
