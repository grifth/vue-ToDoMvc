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
	window.app =  new Vue({
		el:'#todoapp',
		data:{
			todos,
			currentEditing:null,
			filterStat: 'all',
		},
		methods:{
			addTodo(){
				var todoText = event.target.value.trim()
				if(!todoText.length){
					return 
				}
				var lastTodo = this.todos[this.todos.length - 1]
				var id = lastTodo ? lastTodo.id+1 : 1
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
			},
			removeTodo(idx,event){
				this.todos.splice(idx,1)
			},
			removeAllDone(){
				this.todos = this.todos.filter(item=>!item.completed)
			}
		},
		computed:{
			leftCount(){
				return this.todos.filter((item)=>{return !item.completed}).length
			},
			filterTodos() {
				switch (this.filterStat) {
				  case 'active':
					return this.todos.filter(item => !item.completed)
					break
				  case 'completed':
					return this.todos.filter(item => item.completed)
					break
				  default:
					return this.todos
					break
				}
			  },
			  toggleStat: function () {
				return this.todos.every(item => item.completed)
			  }
		}
	})
	window.onhashchange = function () {
		// 得到点击的路由 hash
		var hash = window.location.hash.substr(2) || 'all'
	
		// 设置到程序中的过滤状态
		//    过滤状态一旦改变，则计算属性会感知到这个 filterStat 变了
		//    当它感知到 filterStat 变了之后，就会重新计算执行
		//    当 filterTodos 重新计算执行之后，数据得到了更新，则自动同步更新到视图中
		window.app.filterStat = hash
	  }
	
	  // 页面第一次进来，执行一次
	  window.onhashchange()
})(Vue)
