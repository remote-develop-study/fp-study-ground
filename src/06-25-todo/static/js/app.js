import $ from './selector.js'
import state from './state.js'
(() => {
  const todoDOM = todo => `
	<li class="${todo.done && 'completed'}">
		<input class="toggle" type="checkbox" data-id="${todo.id}" ${todo.done &&
    'checked'}>
		<label>${todo.title}</label>
		<button data-id="${todo.id}" class="delete"/>
	</li>`

  const getCurrentId = () =>
    state.todos.length !== 0 ?
    Math.max(...state.todos.map(todo => todo.id)) + 1 :
    0

  const newTodo = title => ({
    id: getCurrentId(),
    title,
    done: false
  })

  const render = () => {
    $('.todo-list').innerHTML = state.todos
      .filter(todo => state.filter !== 'active' || !todo.done)
      .filter(todo => state.filter !== 'completed' || todo.done)
      .reverse()
      .map(todoDOM)
      .join('')
    $('.todo-count').innerHTML = `
		<strong>${state.todos.filter(todo => !todo.done).length}</strong> items left`
  }

  const addPropertyReactiveness = () => {
    Object.defineProperties(state, {
      todos: {
        set(v) {
          state._todos = v
          localStorage._todos = JSON.stringify(v)
          render()
        },
        get() {
          return state._todos
        }
      },
      filter: {
        set(v) {
          state._filter = v
          render()
        },
        get() {
          return state._filter
        }
      }
    })
  }

  const bindDOMEvents = () => {
    $('.new-todo').addEventListener('keypress', e => {
      if (e.keyCode !== 13 || !e.target.value.trim()) return
      state.todos = [...state.todos, newTodo(e.target.value)]
      e.target.value = ''
    })
    $('ul.filters li a').map(DOM =>
      DOM.addEventListener('click', e => {
        state.filter = e.target.id
        $('#all').classList.remove('selected')
        $('#active').classList.remove('selected')
        $('#completed').classList.remove('selected')
        $(`#${e.target.id}`).classList.add('selected')
      })
    )
    $('.todo-list').addEventListener('click', e => {
      if (e.target.classList.value === 'delete') {
        state.todos = state.todos.filter(todo => todo.id != e.target.dataset.id)
      }
      if (e.target.classList.value === 'toggle') {
        state.todos = state.todos.map(
          todo =>
          todo.id == e.target.dataset.id ? {
            ...todo,
            done: !todo.done
          } :
          todo
        )
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

  bindDOMEvents()
  addPropertyReactiveness()
  state.todos = localStorage._todos ? JSON.parse(localStorage._todos) : []
})()