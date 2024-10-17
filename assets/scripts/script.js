'use strict';

restoreTasksInList();

function restoreTasksInList() {
  const tasksData = JSON.parse(localStorage.getItem('tasksData'));

  if (!tasksData) return;

  const tasks = tasksData.map(taskData => {
    const task = createTask(taskData.textContent, taskData.id);
    const taskDoneCheckbox = task.querySelector('.to-do__done-input');

    taskDoneCheckbox.checked = taskData.checked;

    return task;
  });

  const toDoList = document.querySelector('.to-do__list');

  tasks.forEach(task => toDoList.append(task));

  showList();
}

const addButton = document.querySelector('.to-do__button');
const clearButton = document.querySelector('#clear-list');

addButton.addEventListener('click', addTaskToList);
clearButton.addEventListener('click', clearList);

function addTaskToList() {
  const toDoInput = document.getElementById('new-task');
  const taskText = toDoInput.value;

  if (taskText === '') {
    return;
  }

  if (isEmptyList()) {
    showList();
  }

  const toDoList = document.querySelector('.to-do__list');
  const task = createTask(taskText, null);

  toDoList.append(task);

  toDoInput.value = '';

  addToLocalStorage(task);
}

function isEmptyList() {
  const noTasksPlaceholder = document.querySelector('.to-do__no-tasks');
  return !noTasksPlaceholder.classList.contains('hidden');
}

function showList() {
  const toDoList = document.querySelector('.to-do__list');

  makeVisible(toDoList);

  const noTasksPlaceholder = document.querySelector('.to-do__no-tasks');

  makeInvisible(noTasksPlaceholder);

  changeClearButtonState('abled');
}

function makeVisible(elem) {
  elem.classList.remove('hidden');
}

function makeInvisible(elem) {
  elem.classList.add('hidden');
}

function changeClearButtonState(state) {
  const clearButton = document.querySelector('#clear-list');

  if (state === 'disabled') {
    clearButton.disabled = true;
  } else if (state === 'abled') {
    clearButton.disabled = false;
  }
}

function createTask(taskText, id) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('to-do__task');
  taskItem.textContent = taskText;

  addTaskStatusIndicator(taskItem, id);

  return taskItem;
}

function addTaskStatusIndicator(taskItem, id) {
  taskItem.insertAdjacentHTML(
    'beforeend',
    `<label class="to-do__done-label"
                ><input type="checkbox" class="to-do__done-input" /><span
                  class="to-do__done-custom-input"
                ></span
              ></label>`
  );
  const taskDoneCheckbox = taskItem.querySelector('.to-do__done-input');

  taskDoneCheckbox.id = id ? id : crypto.randomUUID();

  addHandlerFor(taskDoneCheckbox);
}

function addHandlerFor(taskDoneCheckbox) {
  taskDoneCheckbox.addEventListener('change', function () {
    const tasksData = JSON.parse(localStorage.getItem('tasksData'));

    tasksData.forEach(taskData => {
      if (taskData.id === taskDoneCheckbox.id) {
        taskData.checked = taskDoneCheckbox.checked;
      }
    });

    localStorage.setItem('tasksData', JSON.stringify(tasksData));
  });
}

function clearList() {
  const toDoList = document.querySelector('.to-do__list');
  toDoList.innerHTML = '';

  makeInvisible(toDoList);

  const noTasksPlaceholder = document.querySelector('.to-do__no-tasks');

  makeVisible(noTasksPlaceholder);

  changeClearButtonState('disabled');

  localStorage.removeItem('tasksData');
}

function addToLocalStorage(task) {
  if (!localStorage.getItem('tasksData')) {
    localStorage.setItem('tasksData', JSON.stringify([]));
  }

  const taskDoneCheckbox = task.querySelector('.to-do__done-input');
  const taskData = {
    id: taskDoneCheckbox.id,
    textContent: task.textContent,
    checked: taskDoneCheckbox.checked
  };

  const tasksData = JSON.parse(localStorage.getItem('tasksData'));

  tasksData.push(taskData);

  localStorage.setItem('tasksData', JSON.stringify(tasksData));
}
