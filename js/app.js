;(function (Vue) {
	const todos = [
		{
			id:1,
			title:'士郎',
			completed:false
		},
		{
			id:2,
			title:'切嗣',
			completed:false
		},
	]

	new Vue({
		el:'#todoapp',
		data:{
			todos,
		},
		methods:{
			addTodo(){
				var todoText = event.target.value.trim()
				if(!todoText.length){
					return 
				}
				var id = this.todos[this.todos.length-1].id+1

				this.todos.push({
					id,
					title:todoText,
					completed:false
				})
				event.target.value=''
			},
			toggleAll(){
				var checked = event.target.checked
				this.todos.forEach(todo=>todo.completed = checked)
			}
		}
	})

})(Vue)
