
	// Your starting point. Enjoy the ride!
	let STORAGE_KEY = 'todomvc'
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
	Vue.directive('focus',{
		inserted(el){
			el.focus()
		}
	})
	var app = new Vue({
		el:'.todoapp',
		data:{
			todos:todoStorage.fetch(),
			newTodo:'',
			edited:null
		},
		methods:{
			add(){
				var val  = this.newTodo && this.newTodo.trim()
				if(!val){
					return
				}
				this.todos.push({
					name:val,
					completed:false,
					id:todoStorage.uid++
				})
				this.newTodo = ''
			},
			remove(todo){
				var idx =  todo.id
				this.todos.splice(idx,1)
			},
			edit(todo){
				console.log(11);
				todo.before = todo.name
				this.edited = todo
			},
			done(todo){
				if(!this.edited){
					console.log(1);
					return
				}
				this.edited = null
				todo.name = todo.name.trim()
				if(!todo.name){
					this.remove(todo)
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
		}

	})
