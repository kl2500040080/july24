console.log("Todo App Loaded");

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoGrid = document.getElementById("todoGrid");

// Load saved tasks
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Display saved tasks
renderTodos();

// Add Task
todoForm.addEventListener("submit", function(e){

    e.preventDefault();

    const taskText = todoInput.value.trim();

    if(taskText === "") return;

    const newTodo = {

        id: Date.now(),
        text: taskText,
        completed: false,
        time: new Date().toLocaleString()

    };

    todos.push(newTodo);

    saveTodos();

    renderTodos();

    console.log("Task Added:", newTodo);

    todoInput.value = "";

});

// Display Tasks

function renderTodos(){

    todoGrid.innerHTML = "";

    if(todos.length === 0){

        todoGrid.innerHTML = "<p>No tasks yet. Add one above!</p>";

        return;

    }

    todos.forEach(function(todo){

        const card = document.createElement("div");

        card.classList.add("todo-card");

        if(todo.completed){

            card.classList.add("completed");

        }

        card.innerHTML = `

            <p>${todo.text}</p>

            <small>Added: ${todo.time}</small>

            <div class="card-actions">

                <button
                    class="btn-complete"
                    onclick="toggleComplete(${todo.id})">

                    ${todo.completed ? "Undo" : "Complete"}

                </button>

                <button
                    class="btn-delete"
                    onclick="deleteTodo(${todo.id})">

                    Delete

                </button>

            </div>

        `;

        todoGrid.appendChild(card);

    });

}

// Complete Task

function toggleComplete(id){

    todos = todos.map(function(todo){

        if(todo.id === id){

            return {

                ...todo,

                completed: !todo.completed

            };

        }

        return todo;

    });

    saveTodos();

    renderTodos();

}

// Delete Task

function deleteTodo(id){

    todos = todos.filter(function(todo){

        return todo.id !== id;

    });

    saveTodos();

    renderTodos();

}

// Save Tasks

function saveTodos(){

    localStorage.setItem("todos", JSON.stringify(todos));

}