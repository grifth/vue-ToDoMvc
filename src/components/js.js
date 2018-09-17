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
        remove(idx){
            this.items.splice(idx,1)
        }
    }
  }