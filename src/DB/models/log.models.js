import { db } from "../connection.js";



export const logModel = db.collection('logs',
    { capped: true, size: 10000, max: 30 }
)