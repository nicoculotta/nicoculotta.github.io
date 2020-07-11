Vue.component('CoinDetail', {

    props: ['coin'],

    data(){
        return {
            showPrices: false,
            value: 0
        }
    },

    methods: {
        toggleShowPrices(){
            this.showPrices = !this.showPrices

            this.$emit('change-color', 
                this.showPrices ? 'f00fff' : '00f443')
        }
    },

    computed: {
        title() {
            return `${this.coin.name} - ${this.coin.symbol}`
        },

        convertedValue(){
            if (!this.value){
                return 0
            }

            return this.value / this.coin.elPrecio
        }
    },

    template: `
        <div class="container">
            <div class="image is-128x128 mb-3">
                <img 
                    v-on:mouseover="toggleShowPrices"
                    v-on:mouseout="toggleShowPrices" 
                    v-bind:src="coin.img" 
                    v-bind:alt="coin.name"
                >
            </div>
            <h1 class="title">{{ title }}</h1>
            <span v-if="coin.valorBtc > 0">{{ coin.valorBtc }} USD</span>
            <span v-else>No tenemos el valor</span>
            <div class="mt-3">
                <button 
                    v-on:click="toggleShowPrices"
                    v-bind:class="showPrices === true ? 'button is-primary' : 'button is-info'">{{ showPrices ? "Mostrar" : "Ocultar" }}
                </button>
            </div>

            <div class="box">
                <input class="input" type="number" placeholder="Text number" v-model="value">
                <span>{{ convertedValue }}</span>
            </div>

            <slot name="text"></slot>
            <slot name="link"></slot>

            <div class="level">
                <div class="level-item">
                    <div class="content">
                        <ul v-show=showPrices>
                            <li 
                                v-bind:class="{ 'has-text-primary': p.value === coin.elPrecio, 'has-text-danger': p.value < coin.elPrecio }"
                                v-for="(p, i) in coin.pricesWithDays"
                                v-bind:key="p.day">
                                    {{ i }} - {{ p.day }}: {{ p.value }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
})

new Vue({
    el: '#app',

    data() {
        return {

            btc: {
                name: 'Bitcoin',
                symbol: 'BTC',
                img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
                valorBtc: 10,
                elPrecio: 9000,
                pricesWithDays: [
                    { day:'Lunes', value:8400 },
                    { day:'Martes', value:7900 },
                    { day:'Miercoles', value:8200 },
                    { day:'Jueves', value:9000 },
                    { day:'Viernes', value:9400 },
                    { day:'Sabado', value:10000 },
                    { day:'Domingo', value:10200 }
                ]
            },
            
            color: 'fafafa'

        }
    },


    methods: {
        updateColor(color){
            this.color = color || this.color.split('').reverse('').join('')
        }
    }
})