
    
// Todoリストの配列
const todoList = [];

// Todoリストの要素を生成する関数
function createTodoItem(content) {
  const id = Date.now().toString();
  return {
    id,
    content,
  };
}

// Todoリストを表示する関数
function showTodoList() {
  const todoListContainer = document.getElementById('todo-list-container');
  todoListContainer.innerHTML = '';

  todoList.forEach((todoItem) => {
    const todoItemElement = document.createElement('div');
    todoItemElement.classList.add('todo-item');
    todoItemElement.dataset.id = todoItem.id;

    const todoContentElement = document.createElement('div');
    todoContentElement.classList.add('todo-content');
    todoContentElement.textContent = todoItem.content;

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('delete-button');
    deleteButtonElement.textContent = '削除';
    deleteButtonElement.addEventListener('click', () => {
      deleteTodoItem(todoItem.id);
    });

    todoItemElement.appendChild(todoContentElement);
    todoItemElement.appendChild(deleteButtonElement);
    todoListContainer.appendChild(todoItemElement);
  });
}

// Todoリストのアイテムを削除する関数
function deleteTodoItem(id) {
  const todoItemIndex = todoList.findIndex((item) => item.id === id);
  if (todoItemIndex >= 0) {
    todoList.splice(todoItemIndex, 1);
    showTodoList();
    saveTodoList();
  }
}

// フォームを送信したときの処理
function handleFormSubmit(event) {
  event.preventDefault();
  const todoInput = document.getElementById('todo-input');
  const todoContent = todoInput.value.trim();
  if (todoContent !== '') {
    const todoItem = createTodoItem(todoContent);
    todoList.push(todoItem);
    showTodoList();
    saveTodoList();
    todoInput.value = '';
  }
}

// TodoリストをlocalStorageに保存する関数
function saveTodoList() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// localStorageからTodoリストを読み込む関数
function loadTodoList() {
  const storedTodoList = localStorage.getItem('todoList');
  if (storedTodoList !== null) {
    todoList.push(...JSON.parse(storedTodoList));
    showTodoList();
  }
}

// 初期化処理
function init() {
  const todoForm = document.getElementById('todo-form');
  todoForm.addEventListener('submit', handleFormSubmit);
  loadTodoList();
}

init();



