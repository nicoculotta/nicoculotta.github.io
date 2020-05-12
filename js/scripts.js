let casesArray = []

/* Mejor crear objetos asi, asi no tenes la estructura escondida en el codigo y podes crear funciones como la de getURL */
function Case(client,workflow,type,id,note,date){
    this.client = client
    this.workflow = workflow
    this.type = type
    this.id = id
    this.note = note
    this.date = date

    this.setClient = (client) => this.client = client
    this.getURL = () => `https://teg.avature.net/#Case/${this.id}`
    this.getDateFormatted = () => moment(this.date).format("DD/MM")
    this.hasNote = () => !!this.note
}

/* Alpedo esto, si pones el script al final del body ya lo esta cargando ultimo, solo sirve cuando haces alguna llamada por ajax o algo raro */
//$(document).ready(function () {

/* ELEMENT FORM */
let clientNameInput = $('#clientNameInput')
let typeNameInput = $('#typeNameInput')
let idCaseInput = $('#idCaseInput')
let caseNoteInput = $('#caseNoteInput')

let caseContainerAll = $('.cases__container--all')
let casesHeaderSpan = $('.cases__header span')
let noCasesContainer = $('.no__cases--container')
let header = $('header')

let allFilters = $('.filter__list')
let todayFilter = $('#todayFilter')
let allFilter = $('#allFilter')
let modal = $('.remodal').remodal()

const workflowArray = [
    {
        'id':'1',
        'value': 'Queue for Dev',
        'cssClass': 'workflow--queue'
    },
    {
        'id':'2',
        'value': 'Sent to Case Owner',
        'cssClass': 'workflow--co'
    },
    {
        'id':'3',
        'value': 'Development',
        'cssClass': 'workflow--dev'
    },
    {
        'id':'4',
        'value': 'Code Review',
        'cssClass': 'workflow--cr'
    },
    {
        'id':'5',
        'value': 'First Review',
        'cssClass': 'workflow--fr'
    },
    {
        'id':'6',
        'value': 'In QA',
        'cssClass': 'workflow--qa'
    },
    {
        'id':'7',
        'value': 'Changes and Feedback',
        'cssClass': 'workflow--cf'
    },
    {
        'id':'8',
        'value': 'Bugfixing',
        'cssClass': 'workflow--bug'
    },
    {
        'id':'9',
        'value': 'Merged',
        'cssClass': 'workflow--merge'
    }
]

loadLocalStorage()
showCases()
Sortable.create(casesContainerAll,{
    onEnd: (e) => updateArrayPosition(e.item.attributes.getNamedItem("data-id").value,e.newIndex-1)
});


function updateArrayPosition(id,newPosition){
    let caseToMove;

    for ( let i = 0; i < casesArray.length; i++){
        if(casesArray[i].id === id) {
            caseToMove = casesArray[i]
            casesArray.splice(i, 1)
            casesArray.splice(newPosition, 0, caseToMove)
            break;
        }
    }
    saveInLocalStorage()
    
}
/* Un solo metodo podias usar para actualizar cualquier key del array */
function updateArray(key,id,newValue){
    for ( let i = 0; i < casesArray.length; i++){
        if(casesArray[i].id === id) {
            casesArray[i][key] = newValue
            break;
        }
    }
}


function updateDate(e){
    e.text(moment().format("DD/MM"))
}

/* La nota no era opcional? Y te falto validar el id que no exista ya */
function validateForm(){

    let isValid = true

    if (clientNameInput.val() === ''){
        isValid = false
        addErrorClass(clientNameInput)
    }
    if (typeNameInput.val() === ''){
        isValid = false
        addErrorClass(typeNameInput)
    }
    if (idCaseInput.val() === '' || idExist(idCaseInput.val())) {
        isValid = false
        addErrorClass(idCaseInput)
    }
    /*
    if (caseNoteInput.val() === ''){
        isValid = false
        addErrorClass(caseNoteInput)
    } */
    return isValid
}  

function addErrorClass(e){
    e.addClass('error');
}

function idExist(id){
    for ( let i = 0; i < casesArray.length; i++){
        if(casesArray[i].id === id) {
            return true;
        }
    }
    return false;
}

function printCase(caseInfo){

    let options=""
    let cssClass;
    for (i=0 ; i<workflowArray.length;i++){
        if (caseInfo.workflow == workflowArray[i].id){
            options += `<option value="${workflowArray[i].id}" selected>${workflowArray[i].value}</option>`
            cssClass = workflowArray[i].cssClass
        }
        else
            options += `<option value="${workflowArray[i].id}">${workflowArray[i].value}</option>`
    }

    hasNote = caseInfo.hasNote() ? "has-note" : "";
    let iconNoteTemplate = `<div  class="case__buttons--icon--note ${hasNote}" data-id="${caseInfo.id}"></div>`

    let noteTemplate = `<div class="case__note" style="display:none;" data-id="${caseInfo.id}">
                            <input type="text" autocomplete="off" name="type" class="noteInput" value="${caseInfo.note}" data-id="${caseInfo.id}"></input>
                        </div>`

    let caseTemplate = `<div class="case__container ${cssClass}" data-id="${caseInfo.id}">
                            <div class="case">
                                <div class="case__item--client">
                                    <input type="text" name="client" autocomplete="off" class="clientInput" value="${caseInfo.client}" data-id="${caseInfo.id}">
                                </div>
                                <div class="case__item--type">
                                    <input type="text" name="type" autocomplete="off" class="typeInput" value="${caseInfo.type}" data-id="${caseInfo.id}">
                                </div>
                                <div class="case__item--date" data-id="${caseInfo.id}">${caseInfo.getDateFormatted()}</div>
                                <div class="case__item--workflow ">
                                    <select data-id="${caseInfo.id}" class="workflowInput">
                                        ${options}
                                    </select>
                                </div>
                                <div class="case__buttons">
                                    ${iconNoteTemplate}

                                    <a href="${caseInfo.getURL()}" target="_blank">
                                        <div class="case__buttons--icon--link"></div>
                                    </a>
                                    
                                    <div class="case__buttons--icon--remove" data-id="${caseInfo.id}">
                                    </div>
                                </div>     
                            </div>
                            ${noteTemplate}
                        </div>`;
                        
    return caseTemplate
}


function removeElementFromArray(id, array) {
    for (let i=0; i < array.length; i++){
        if (array[i].id === id ){
            array.splice( i, 1)
            break
        }
    }
    saveInLocalStorage()
}

// LOCAL STORAGE
function saveInLocalStorage(){
    localStorage.setItem('casesList', JSON.stringify(casesArray))
}

/* Cambie como es el load en local storage, asi se crean objetos "Case" */
function loadLocalStorage(){
    localStorageData = JSON.parse(localStorage.getItem('casesList'));
    if (localStorageData) {
        for (i=0 ; i< localStorageData.length;i++){
            casesArray.push(new Case(
                localStorageData[i].client,
                localStorageData[i].workflow,
                localStorageData[i].type,
                localStorageData[i].id,
                localStorageData[i].note,
                localStorageData[i].date
            ))
        }    
    }
    
    if (casesArray === null){
        casesArray = []
    }
}

function showCases() {
    if (casesArray.length === 0){
        casesHeaderSpan.addClass('dNone')
    } else {
        noCasesContainer.addClass('dNone')
        header.removeClass('hideHeader')
        allFilters.children('.filter__list--item[data-filter="all"]').addClass('selected')
        for (let i = 0; i < casesArray.length; i++) {
            caseContainerAll.prepend(printCase(casesArray[i]))
            
        }
    }
}




// WHEN CLICK CREATE A CASE FROM MODAL
$('#buttonCreate').click( function(){
    // Primero valida el form 
    let isValid = validateForm()
    if (isValid) {
        let caseToAdd = new Case(
            clientNameInput.val(),
            $('#caseWorkflowInput option:selected').val(),
            typeNameInput.val(),
            idCaseInput.val(),
            caseNoteInput.val(),
            new Date()
        )
        modal.close()
        casesArray.unshift(caseToAdd)
        caseContainerAll.preend(printCase(caseToAdd))
        noCasesContainer.addClass('dNone')
        header.removeClass('hideHeader')
        saveInLocalStorage()
    }

    if (casesArray.length > 0) {
        casesHeaderSpan.removeClass('dNone')
    }
})

// ANIMATION CASES
let caseContainer = $('.case__container')
$.each(caseContainer, function(key){
    let counter = key / 20
    $(this).css('animation-delay', `${counter}` + 's')
})

// SHOW/HIDE NOTE
caseContainerAll.on('click', '.case__buttons--icon--note', function(){
    let target = $(this).attr("data-id")
    let noteContainer = $(`.case__note[data-id=${target}]`)
    noteContainer.toggle("swing")
})

// DELETE CASE
caseContainerAll.on('click', '.case__buttons--icon--remove', function(){
    let target = $(this).attr("data-id")
    let caseToRemove = caseContainerAll.children(`.case__container[data-id=${target}]`)
    caseToRemove.remove()

    removeElementFromArray(target, casesArray)
    if (casesArray.length === 0){
        noCasesContainer.removeClass('dNone')
        casesHeaderSpan.addClass('dNone')
        header.addClass('hideHeader')
    } 
})

// UPDATE CLIENTE
caseContainerAll.on('change', '.clientInput', function(){
    let target = $(this).attr("data-id")
    let newClient = $(this).val()
    updateArray("client",target, newClient)
    saveInLocalStorage()
})

// UPDATE PORTAL TYPE
caseContainerAll.on('change', '.typeInput', function(){
    let target = $(this).attr("data-id")
    let newType = $(this).val()
    updateArray("type",target, newType)
    saveInLocalStorage()
})

// UPDATE NOTE
/*Aca agregue para la nota opcional que muestre el punto rojo */ 
caseContainerAll.on('change','.noteInput', function(){
    let target = $(this).attr("data-id")
    let newNote = $(this).val()

    if (newNote)
        $(`.case__buttons--icon--note[data-id=${target}]`).addClass("has-note")
    else
        $(`.case__buttons--icon--note[data-id=${target}]`).removeClass("has-note")

    updateArray("note",target, newNote)
    saveInLocalStorage()
})

// UPDATE WORKFLOW
caseContainerAll.on('change','.workflowInput', function(){
    let target = $(this).attr("data-id")
    let newStep = $(this).val()

    // change class depends workflow step
    let newCssClass = workflowArray[`${newStep -1 }`].cssClass

    $(`.case__container[data-id=${target}]`).removeClass(function (index, css) {
        return (css.match (/(^|\s)workflow--\S+/g) || []).join(' ');
    });
    $(`.case__container[data-id=${target}]`).addClass(`${newCssClass}`)
    
    updateArray("workflow",target, newStep)
    saveInLocalStorage()
})

// UPDATE DATE
caseContainerAll.on('click','.case__item--date', function(){
    let targetData = $(this).attr('data-id')
    let target = $(this)
    updateDate(target)
    updateArray("date",targetData, new Date())
    saveInLocalStorage()
})

//Filters
allFilters.on('click', '.filter__list--item', function(){
    let target = $(this)
    
    if (target.hasClass('selected')) {
        target.removeClass('selected');
    } else {
        $(".filter__list--item").removeClass('selected');
        target.addClass('selected');
    } 

})

todayFilter.on('click', function(){
    let hoyFormatted = moment().format("DD/MM")
    
    for (let i = 0; i < casesArray.length; i++) {
       
        let dateCases = moment(casesArray[i].date).format("DD/MM")
        
        if ( hoyFormatted !== dateCases){
            let todayCases = caseContainerAll.children(`.case__container[data-id=${casesArray[i].id}]`)
            todayCases.addClass('dNone')
        }
    }
})

allFilter.on('click', function(){
    caseContainerAll.children(`.case__container`).removeClass('dNone')
})
