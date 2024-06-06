import "reflect-metadata";
import { DB_PORT, PORT } from "./config/envs";
import { AppDataSource } from "./config/appDataSource";
import server from "./server";

AppDataSource.initialize()
  .then(() => {
    console.log(`Database connected on ${DB_PORT}`);
    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));


