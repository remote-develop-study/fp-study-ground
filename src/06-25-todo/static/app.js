(() => {    
    /* selector */
    const $inputNewTodo = document.querySelector('.new-todo');
    const $btnToggleAll = document.querySelector('.toggle-all');
    const $todoList = document.querySelector('.todo-list');
    const $todoCount = document.querySelector('.todo-count');
    const $filtersLink = document.querySelectorAll('.filters li a');
    const $btnClearCompleted = document.querySelector('.clear-completed');

    /* todos data */
    const todoData = {
        todos: localStorage.todos ? JSON.parse(localStorage.todos) : [],
        state: 'All'
    };

    const addTodo = text => {
        const {
            todos,
            state
        } = todoData;

        todos.push({
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            isComplete: false,
            text
        });

        renderTodos(todos, state);
    };

    const deleteTodo = id => {
        const {
            todos,
            state
        } = todoData;

        todos.splice(todos.findIndex(todo => (todo.id === +id)),1);

        renderTodos(todos, state);
    };

    const editTodo = (id, text) => {
        const {
            todos,
            state
        } = todoData;

        const editTodoIndex = todos.findIndex(todo => (todo.id === +id));
        todos[editTodoIndex] = Object.assign({},todos[editTodoIndex],{text});

        renderTodos(todos, state);
    };

    const toggleTodo = id => {
        const {
            todos,
            state
        } = todoData;

        const toggleTodoIndex = todos.findIndex(todo => (todo.id === +id));
        todos[toggleTodoIndex] = Object.assign({},todos[toggleTodoIndex],{
            isComplete: !todos[toggleTodoIndex].isComplete
        });

        renderTodos(todos, state);
    };

    const toggleAllTodo = () => {
        const {
            todos,
            state
        } = todoData;
        
        const isDone = todos.some(todo => (!todo.isComplete));
        todoData.todos = todos.map(todo => {
            todo.isComplete = isDone;
            return todo;
        });

        renderTodos(todos, state);
    };

    const getTodoCountLeft = todos => (todos.filter(todo => (todo.isComplete === false)).length);


    /* Event Listener */
    $inputNewTodo.addEventListener('keydown', e =>{
        if(e.keyCode === 13){
            addTodo(e.target.value);
            e.target.value = '';
        }
    });

    $btnToggleAll.addEventListener('click', e => (toggleAllTodo()));

    $todoList.addEventListener('click', e => {

        if(e.target.className === "destroy"){
            deleteTodo(e.target.dataset.id);
        }
        if(e.target.tagName === "LABEL"){
            //console.log("click");
            e.target.addEventListener('dblclick', e => {
                const elem = e.target.parentNode.parentNode;

                if(elem.classList.contains("editing") == false){

                    //console.log("dblclick");
                    const editInput = [...elem.childNodes].filter(v => (v.className === "edit"))[0];
                    elem.classList.add("editing");
                    editInput.focus();
                    editInput.addEventListener('keydown', e => {
                        //console.log('editInput keydown');
                        if(e.keyCode === 13){
                            editTodo(e.target.dataset.id, e.target.value);
                            e.target.parentNode.classList.remove("editing");
                        }
                    })
                    editInput.addEventListener('blur', e => {
                        //console.log('editInput blur');
                        e.target.parentNode.classList.remove("editing");
                    })
                }
            });
        }
        if(e.target.className === "toggle"){
            toggleTodo(e.target.dataset.id);
        }
    });

    $filtersLink.forEach(filter => {
        filter.addEventListener('click', e => {
            if(e.target.classList.contains("selected")) return false;

            $filtersLink.forEach(link => {link.classList.remove("selected")});
            e.target.classList.add("selected");
            todoData.state = e.target.text;
            renderTodos(todoData.todos, todoData.state);
        }) 
    });

    $btnClearCompleted.addEventListener('click', e => {
        todoData.todos = todoData.todos.filter(v => v.isComplete === false);
        renderTodos(todoData.todos, todoData.state);
    });

    const StatefilterTodos = (todos, state) => {
        if(state === "Active"){
            return todos.filter(v => v.isComplete === false);
        }
        if(state === "Completed"){
            return todos.filter(v => v.isComplete === true);
        }
        return todos;
    }

    const renderTodos = (todos, state = 'All') => {
        const todoCountLeft = getTodoCountLeft(todos);

        todos = StatefilterTodos(todos, state);

        $todoList.innerHTML = '';
        $todoCount.innerHTML = `<strong>${todoCountLeft}</strong> ${todoCountLeft > 1 ? 'items' : 'item'} left`;
        
        for(let i = todos.length - 1; i >= 0; i--){
            $todoList.innerHTML += `<li class="${todos[i].isComplete ? 'completed ' : ''}" data-id="${todos[i].id}">
                <div class="view">
                    <input class="toggle" type="checkbox" data-id="${todos[i].id}" ${todos[i].isComplete ? 'checked' : ''}>
                    <label data-id="${todos[i].id}">${todos[i].text}</label>
                    <button class="destroy" data-id="${todos[i].id}"></button>
                </div>
                <input type="text" class="edit" value="${todos[i].text}" data-id="${todos[i].id}" />
            </li>`;
        }
        
        localStorage.todos = JSON.stringify(todos);
    };

    renderTodos(todoData.todos, todoData.state);
})();
    