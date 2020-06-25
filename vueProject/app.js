new Vue({
    el: '#app',

    data() {
        return {
            name: 'Bitcoin',
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png',
            valorBtc: -20,
            precios: [1200,430,1293343,1235,59645],
            pricesWithDays: [
                { day:'Lunes', value:8400 },
                { day:'Martes', value:7900 },
                { day:'Miercoles', value:8200 },
                { day:'Jueves', value:9000 },
                { day:'Viernes', value:9400 },
                { day:'Sabado', value:10000 },
                { day:'Domingo', value:10200 },
            ]
        }
    }
})