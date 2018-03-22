import { safeLoad } from 'js-yaml';
import { readFileSync } from 'fs';

interface Config {
    db: {
        username: string;
        password: string;
        database: string
        options?: {};
    };
    port: number;
}

export const CONNPASS_API = 'https://connpass.com/api/v1/event/';
export const CONNPASS_EXPIRE = 3600;
export default (() => safeLoad(readFileSync('config.yml', 'utf-8')))() as Config;