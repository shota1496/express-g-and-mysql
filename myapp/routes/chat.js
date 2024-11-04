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

const WebSocket = require("ws");

// ポート3000でWebSocketサーバーを作成
const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("クライアントが接続されました");

  // クライアントからメッセージを受信
  ws.on("message", (message) => {
    console.log("クライアントから受信:", message);

    // 受信メッセージを全てのクライアントに送信
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`サーバーからの返信: ${message}`);
      }
    });

    db.query('insert into chat value(0,"' + message + '")', (err, results) => {
      if (err) {
        res.status(500).send("エラーが発生しました");
      } else {
        //res.json(results);
      }
    });
  });

  // 接続が切断されたときの処理
  ws.on("close", () => {
    console.log("クライアントが切断されました");
  });
});

console.log("WebSocketサーバーがポート3001で起動しました");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('respond with a resource');

  db.query("SELECT * FROM chat", (err, results) => {
    if (err) {
      res.status(500).send("エラーが発生しました");
    } else {
      //res.json(results);
    }
    res.render("chat", { title: results });
  });
});

module.exports = router;
