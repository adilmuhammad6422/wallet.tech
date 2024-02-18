const express = require('express')
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "wallet-tech-db.czcssyw8u2fq.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "wallet.tech",
    database: "wallet-tect-db"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE username = ? AND password = ?"
    db.query(sql, [req.body.email, req.body.password], (err, data) =>{
        if(err) return res.json("Login failed");
        if(data.length > 0){
            return res.json("login success")
        }
        else{
            return res.json("No record")
        }
        return res.json(data);
    })
})