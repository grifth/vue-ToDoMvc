
	// Your starting point. Enjoy the ride!
	let STORAGE_KEY = 'todos-vuejs'
	let todoStorage = {
		fetch(){
			var todos = JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')
			todos.forEach(function(todo,idx){
				todo.id = idx
			})
			todoStorage.uid = todos.length
			return todos 
		},
		save(todos){
			localStorage.setItem(STORAGE_KEY,JSON.stringify(todos))
		}
	}

	var filters = {
		all(todos){
			return todos
		},
		active(todos){
			return todos.filter((todo)=>{
				return !todo.completed
			})
		},
		completed(todos){
			return todos.filter((todo)=>{
				return todo.completed 
			})
		}
	}

	Vue.directive('focus', {
		// 当被绑定的元素插入到 DOM 中时……
		inserted: function (el) {
		  // 聚焦元素
		  // el.focus()
		  // el 就是作用了 v-focus 的 DOM 元素
		  console.log(el)
		  el.focus()
		}
	  })
	
	var app = new Vue({
		data:{
			todos:todoStorage.fetch(),
			newTodo:'',
			edited:null,
			vbl:'all'
		},
		methods:{
			add(){
				var val = this.newTodo && this.newTodo.trim()
				if(!val){
					return 
				}
				this.todos.push({
					id:todoStorage.uid++,
					title:val,
					completed:false
				})
				this.newTodo = ''
			},
			remove(todo){
				var idx = todo.id
				this.todos.splice(idx,1)
			},
			edit(todo){
				this.befor = todo.title
				this.edited = todo
			},
			done(todo){
				if(!this.edited){
					console.log(1);
					return
				}
				this.edited = null
				todo.title = todo.title.trim()
				if(!todo.title){
					this.remove(todo)
				}
			},
			cancel(todo){
				this.edited = null
				todo.title = this.before
			},
			removeAll(){
				this.todos = filters.active(this.todos)
			}
		},
		computed:{
			filteredTodos(){
				return filters[this.vbl](this.todos)
			},
			remaining(){
				return filters.active(this.todos).length
			},
			all:{
				get(){
					return this.remaining === 0 
				},
				set(val){
					this.todos.forEach((todo)=>{
						todo.completed = val 
					})
				}
			}
		},
		watch:{
			todos:{
				handler(c){
					todoStorage.save(c)
				},
				deep:true
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
		}
	}) 


app.$mount('.todoapp')
