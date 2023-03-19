function displayDateTime() {
    const now = new Date();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][now.getDay()];
    const date = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    const dateTime = `${year}年${month}月${date}日 (${dayOfWeek}) ${time}`;
    document.getElementById("datetime").textContent = dateTime;
  
    requestAnimationFrame(displayDateTime); // 次のフレームでdisplayDateTime()を呼び出す
  }
  
  displayDateTime(); // 最初にdisplayDateTime()を呼び出す
  