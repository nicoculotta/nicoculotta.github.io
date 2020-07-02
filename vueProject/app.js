new Vue({
    el: '#app',

    data() {
        return {
            name: 'Bitcoin',
            symbol: 'BTC',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
            valorBtc: -20,
            pricesWithDays: [
                { day:'Lunes', value:8400 },
                { day:'Martes', value:7900 },
                { day:'Miercoles', value:8200 },
                { day:'Jueves', value:9000 },
                { day:'Viernes', value:9400 },
                { day:'Sabado', value:10000 },
                { day:'Domingo', value:10200 },
            ],
            showPrices: false,
            elPrecio: 9000,
            value: 0
        }
    },

    computed: {
        title() {
            return `${this.name} - ${this.symbol}`
        },

        convertedValue(){
            if (!this.value){
                return 0
            }

            return this.value / this.elPrecio
        }
    },

    watch:{
        showPrices(newVal, oldVal){
            console.log(newVal, oldVal)
        }
    },

    methods: {
        toggleShowPrices(){
            this.showPrices = !this.showPrices
        }
    }
})