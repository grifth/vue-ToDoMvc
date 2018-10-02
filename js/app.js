
	// Your starting point. Enjoy the ride!

	var STORAGE_KEY = 'todolist'
	var todoStorage = {
		fetch() {
			var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
			todos.forEach(function (item, idx) {
				item.id = idx
			})
			todoStorage.uid = todos.length
			return todos
		},
		save(todos) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
		}
	}

	Vue.directive('focus', {
		inserted(el) {
			el.focus()
		}
	})
	var app = new Vue({
		el: '.todoapp',
		data: {
			todos: todoStorage.fetch(),
			newTodo: '',
			edited: null,
			filterState: 'all',
		},
		methods: {
			add() {
				var todo = this.newTodo && this.newTodo.trim()
				if (!todo) {
					return
				}
				this.todos.push({
					name: todo,
					completed: false,
				})
				this.newTodo = ''
			},
			remove(idx) {
				this.todos.splice(idx, 1)
			},
			edit(todo) {
				todo.before = todo.name
				this.edited = todo
			},
			done(todo, idx) {
				console.log('1111', '')
				var val = todo.name && todo.name.trim()
				if (!val) {
					this.remove(idx, 1)
				}
				todo.name = val
				this.edited = null
			},
			cancel(todo) {
				todo.name = todo.before
				this.edited = null;
			},
			removeAll() {
				this.todos = this.todos.filter((item) => !item.completed)
			},
			toggleAll() {
				var checked = event.target.checked
				this.todos.forEach(todo => todo.completed = checked)
			},

		},
		watch: {
			todos: {
				handler(c) {
					todoStorage.save(c)
				},
				deep: true
			}
		},
		directives: {
			// 当作用了该指令的元素所在模板发生更新的时候，则这个 update 钩子会自动调用
			editingFocus: {
				// 在指令钩子中，函数内部的 this 是 window
				update(el, binding) {
					if (binding.value) {
						el.focus()
					}
				}
			}
		},
		computed: {
			toggleState() {
				return this.todos.every(item => item.completed === true)
			},
			leftCount() {
				return this.todos.filter((todo) => !todo.completed).length
			},
			filterTodos() {
				switch (this.filterState) {
					case 'active':
						return this.todos.filter(todo=> !todo.completed)
	break
					  case 'completed':
	return this.todos.filter(todo=> todo.completed)
	break
					  case 'all':
	return this.todos
	break
}
			  }
		  }
	})
	window.onhashchange=function(){
		var hash = window.location.hash.substr(2)||'all'
		window.app.filterState = hash
	}
	window.onhashchange()
