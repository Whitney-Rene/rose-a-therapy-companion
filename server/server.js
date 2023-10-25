import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

import { db } from './db/db-connection.js';

config();

const app = express();

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`This excellent server is beautifully running on port ${PORT}`);
});
