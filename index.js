const timetable = [
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true },
  { content: "", writable: true }
 
];

// タイムテーブルを表示する関数
function displayTimetable(timetable) {
  const tbody = document.querySelector("#timetable tbody");
  for (let i = 0; i < timetable.length; i++) {
    const timeSlot = timetable[i];
    const tr = document.createElement("tr");
    const time = i + 7; // 7:00 AM から始める
    const meridiem = time < 12 ? "AM" : "PM"; // 12時以降はPMを表示する
    const hour = time % 12 === 0 ? 12 : time % 12; // 12時を超えたら1時から再度カウントする
    tr.innerHTML = `
      <td>${hour}:00 ${meridiem} - ${hour + 1}:00 ${meridiem}</td>
      <td class="content" contenteditable="${timeSlot.writable}">${timeSlot.content}</td>
    `;
    tbody.appendChild(tr);
  }
}

// タイムテーブルを更新する関数
function updateTimetable(timetable) {
  const tdContent = document.querySelectorAll("#timetable td.content");
  tdContent.forEach((td, i) => (td.textContent = timetable[i].content));
}


const storedTodoList = localStorage.getItem('todoList');
const tlist = storedTodoList ? JSON.parse(storedTodoList) : [];
const contents = tlist.map(item => item.content);


function assignRandomTodo() {
  const tdContent = document.querySelectorAll("#timetable td.content");
  tdContent.forEach((td) => {
    if (td.textContent === "") {
      const randomIndex = Math.floor(Math.random() * contents.length);
      td.textContent = contents[randomIndex];
    }
  });
}

// タイムテーブルの内容を保存する関数
function saveTimetable() {
  const tdContent = document.querySelectorAll("#timetable td.content");
  const timetable = [];
  tdContent.forEach((td) => timetable.push({ content: td.textContent, writable: td.getAttribute("contenteditable") === "true" }));
  localStorage.setItem("timetable", JSON.stringify(timetable));
  alert("保存しました。");
}

// 初期表示
displayTimetable(timetable);

// 保存ボタンのイベントリスナーを登録
const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", saveTimetable);

// ページが読み込まれた時に、保存されたタイムテーブルがあれば表示する
if (localStorage.getItem("timetable")) {
  const savedTimetable = JSON.parse(localStorage.getItem("timetable"));
  updateTimetable(savedTimetable);
}

const warituke = document.getElementById("warituke-button");
warituke.addEventListener("click", assignRandomTodo);



const allLiset = document.getElementById("allLiset");
allLiset.addEventListener("click",DeleteAll);

function DeleteAll() {
  const tdContent = document.querySelectorAll("#timetable td.content");
  tdContent.forEach((td) => {
    td.textContent = "";
  });
}

