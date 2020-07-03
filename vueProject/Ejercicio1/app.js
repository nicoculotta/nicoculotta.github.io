new Vue({
    el: '#app',
    
    data () {
      return {
        title: '',
        time: null,
        courses: [],
      }
    },

    computed: {
      totalTime(){
        let total = 0;
        this.courses.forEach(e => {
          total += parseInt(e.time)
        })
        return total
      }
    },

    methods: {
      addCourse() {
        this.courses.push({title: this.title, time: this.time})
        this.title = ''
        this.time = null
      }
    }
  })