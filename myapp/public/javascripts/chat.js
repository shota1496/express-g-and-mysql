// WebSocketサーバーに接続
const socket = new WebSocket("ws://localhost:3001");

// 接続が確立したとき
socket.onopen = () => {
  console.log("サーバーに接続されました");
};

// サーバーからメッセージを受信
socket.onmessage = (event) => {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML += `<p>${event.data}</p>`;
};

// エラーハンドリング
socket.onerror = (error) => {
  console.error("WebSocket エラー:", error);
};

// 接続が切断されたとき
socket.onclose = () => {
  console.log("サーバーから切断されました");
};

// メッセージを送信する関数
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  socket.send(message); // サーバーにメッセージを送信
  messageInput.value = "";
}
