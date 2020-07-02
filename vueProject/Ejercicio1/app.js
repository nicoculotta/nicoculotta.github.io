new Vue({
    el: '#app',
    
    data () {
      return {
        courses: [0],
        title: '',
        time: '',
        totalTime: 0
      }
    },
    
    computed: {

    },
    
    methods: {
      addCourse(){
        console.log(`${title} - ${time}`)
      }
    }
  })