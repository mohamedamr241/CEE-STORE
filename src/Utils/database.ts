import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const{
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    DB_PASSWORD,
    DB_USERNAME,
    ENV
}=process.env;

let Environment:string='dev';
let client :Pool = new Pool();


if(ENV == Environment){
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB,
        user:DB_USERNAME,
        password:DB_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:  3000
    });
}
else if (ENV != Environment){
    client = new Pool({
        host:POSTGRES_HOST,
        database:POSTGRES_DB_TEST,
        user:DB_USERNAME,
        password:DB_PASSWORD,
        max: 1000,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis:  3000
    });
}

export default client;