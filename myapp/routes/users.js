var express = require("express");
var router = express.Router();

const mysql = require("mysql2");
const port = 3000;

// MySQLデータベースの接続設定
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // ユーザー名
  password: "Shota1496!", // パスワード
  database: "test_db", // データベース名
});

// データベースに接続
db.connect((err) => {
  if (err) {
    console.error("データベース接続エラー:", err);
    return;
  }
  console.log("データベースに接続されました");
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('respond with a resource');

  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      res.status(500).send("エラーが発生しました");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
