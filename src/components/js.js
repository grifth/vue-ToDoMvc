import todoStorage from './localstorage.js'
export default {
    name: 'HelloWorld',
    data () {
      return {
        items:todoStorage.fetch(),
        newmsg:'',
        edited:null,
      }
    },
    watch:{
        items:{
            deep:true,
            handler(c,o){
                todoStorage.save(c)
            }
        }
    },
    methods:{
        addNew(){
            var val = this.newmsg && this.newmsg.trim(); 
            if(!val){
                return
            }
            var last = this.items[this.length]
            var id = last ?last.id+1:1
            this.items.push({
                id:id,
                name:val,
                completed:false
            })
            this.newmsg = '';
        },
        remove(item){
            var idx = this.items.indexOf(item)
            this.items.splice(idx,1)
        },
        editItem(item){
            this.before = item.name;
            this.edited = item 
        },
        doneEdit(ite){
            console.log(!this.edited);
            

            this.edited = null 
            ite.name = ite.name.trim()
            // console.log(item)
            if(!ite.name){
                this.remove(idx)
            }
        },
        cancelEdit(item){
            this.edited = null;
            item.name = this.before 
        }
    }
  }