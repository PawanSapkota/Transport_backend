import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user"

export const AppDataSource = new DataSource({
    
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "063922",
    database: "transport",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})
