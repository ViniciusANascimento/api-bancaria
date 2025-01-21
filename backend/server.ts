import config from "config";
import dotenv from "dotenv";
import app from './src/app';

dotenv.config();


const port = process.env.PORT //|| config.get<number>("port");
const host = process.env.HOST;

app.listen(port, async () => {
    //Logger.info(`Servidor iniciado : http://${host}:${port}`)
    console.log(`Servidor iniciado: http://${host}:${port}`);
})