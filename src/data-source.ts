import path from "path";
import { DataSource } from "typeorm";

const entities = path.join(__dirname, 'models', '*.ts');

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [entities],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
.then(()=>{ console.log('DataSource initialized'); })
.catch((error)=>{ console.log('DataSource failed',error) });