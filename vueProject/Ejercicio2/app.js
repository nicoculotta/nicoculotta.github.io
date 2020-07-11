Vue.component('modal', {

  props: ['showModal'],

  data() {
    return {
      title: 'Titulo del modal'
    }
  },

  methods: {

    closeModal(){
      this.$emit('close')
    }
  },

  template: `
      <div class="modal is-active">
        <div class="modal-background">
          <div class="modal-content">
            <div class="box">
              <h3>{{ title }} {{ showModal }} </h3>
              <slot name="body"></slot>
            </div>
            <footer>
              <button v-on:click="closeModal" class="modal-close is-large" aria-label="close">Cerrar</button>
            </footer>
          </div>
        </div>
      </div>`
})


new Vue({
    el: '#app',
    
    data () {
      return {
        showModal: false
      }
    },


    methods: {
      show(){
        this.showModal = !this.showModal
      }
    }
  })