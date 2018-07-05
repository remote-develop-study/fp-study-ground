import $ from './selector.js'

(() => {
  const todoDOM = todo => `
	<li class="${todo.done && 'completed'}">
		<input class="toggle" type="checkbox" data-id="${todo.id}" ${todo.done &&
    'checked'}>
		<label contentEditable data-id="${todo.id}">${todo.title}</label>
		<button data-id="${todo.id}" class="delete"/>
	</li>`

  const getCurrentId = state =>
    state.todos.length !== 0 ?
    Math.max(...state.todos.map(todo => todo.id)) + 1 :
    0

  const newTodo = title => ({
    id: getCurrentId(state),
    title,
    done: false
  })

  const render = state => {
    console.time('render')

    const newTodos = [...state.todos]
      .filter(todo => state.filter !== 'active' || !todo.done)
      .filter(todo => state.filter !== 'completed' || todo.done)
      .reverse()
      .map(todoDOM)
      .join('')

    $('.todo-list').innerHTML = newTodos
    $('.todo-count').innerHTML = `
    <strong>${state.todos.filter(todo => !todo.done).length}</strong> items left`

    console.timeEnd('render')
  }

  const bindDOMEvents = state => {
    $('.new-todo').addEventListener('keypress', e => {
      if (e.keyCode !== 13 || !e.target.value.trim()) return
      state.todos = [...state.todos, newTodo(e.target.value)]
      e.target.value = ''
    })
    $('ul.filters').addEventListener('click', e => {
      if (!e.target.id) return
      state.filter = e.target.id
      $('ul.filters li a').map(DOM => DOM.classList.remove('selected'))
      $(`#${e.target.id}`).classList.add('selected')
    })
    $('.todo-list').addEventListener('click', e => {
      if (e.target.classList.value === 'delete') {
        state.todos = state.todos.filter(todo => todo.id != e.target.dataset.id)
      }
      if (e.target.classList.value === 'toggle') {
        state.todos = state.todos.map(
          todo =>
          todo.id != e.target.dataset.id ?
          todo : {
            ...todo,
            done: !todo.done
          }
        )
      }
    })
    $('.todo-list').addEventListener('keypress', e => {
      if (e.keyCode !== 13) return
      e.target.blur()
      if (!e.target.textContent.trim()) {
        console.log(!e.target.textContent.trim())
        state.todos = state.todos.filter(todo => todo.id != e.target.dataset.id)
      }
      if (e.target.textContent.trim()) {
        state.todos = state.todos.map(todo =>
          todo.id != e.target.dataset.id ? todo : { ...todo,
            title: e.target.textContent.trim()
          })
      }
    })
    $('.clear-completed').addEventListener('click', e => {
      state.todos = state.todos.filter(todo => !todo.done)
    })
    $('.toggle-all').addEventListener('click', e => {
      state.todos = state.todos.map(todo => ({ ...todo,
        done: !todo.done
      }))
    })
  }

  const state = {
    set todos(v) {
      state._todos = v
      localStorage.todos = JSON.stringify(v)
      render(state)
    },
    get todos() {
      return state._todos
    },
    set filter(v) {
      state._filter = v
      render(state)
    },
    get filter() {
      return state._filter
    }
  }

  bindDOMEvents(state)

  state.todos = localStorage.todos ? JSON.parse(localStorage.todos) : []
})()