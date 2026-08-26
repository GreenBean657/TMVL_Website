/*
* Deferred clearing of expired registration entries in the database using a worker thread.
*/

const mysql = require("mysql2/promise");
const { parentPort, workerData } = require('worker_threads');
const pool = mysql.createPool({
    host: workerData.dbHost,
    user: workerData.dbUser,
    password: workerData.dbPassword,
    database: workerData.dbName,
    waitForConnections: true,
    connectionLimit: 2
});

parentPort.on('message', async (task) => {
    const [rows] = await pool.execute(task.sql, task.params);
    parentPort.postMessage(rows);
});