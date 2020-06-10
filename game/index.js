let grupoUno = [ "😇", "😆", "😀" ]
console.log(grupoUno)

grupoUno.forEach((elem) => {
    let container = document.createElement('div')
    container.append(elem);
    document.body.append(container)
})