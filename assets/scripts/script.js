const toDoInput = document.getElementById('new-task');
const toDoButton = document.querySelector('.to-do__button');
const toDoList = document.querySelector('.to-do__list');

toDoButton.addEventListener('click', addTask);
toDoList.addEventListener('click', markAsComplited);

function addTask() {
  const taskText = toDoInput.value;

  if (taskText === '') {
    return;
  }

  const taskItem = document.createElement('li');
  taskItem.classList.add('to-do__task');
  taskItem.innerText = taskText;

  addBin(taskItem);

  toDoList.append(taskItem);

  toDoInput.value = '';
}

function addBin(task) {
  const bin = document.createElement('img');

  bin.classList.add('to-do__bin');
  bin.setAttribute('src', './assets/icons/bin.svg');
  bin.setAttribute('alt', 'корзина');

  bin.addEventListener('click', function () {
    this.closest('li').remove();
  });

  task.append(bin);
}

function markAsComplited(evt) {
  if (evt.target.tagName === 'LI') {
    evt.target.classList.toggle('to-do__task_complited');
  }
}
