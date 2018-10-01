let STORAGE_KEY = 'todomvc'
let todoStorage = {
    fetch(){
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')
        todos.forEach((todo.idx){
            todo.id = idx
        })
        todoStorage.uid=todos.length
        return todos 
    },
    save(todos){
        localStorage.save(STORAGE_KEY,JSON.stringify(todos))
    }
}