let casesArray = []

$(document).ready(function () {

    /* ELEMENT FORM */
    let clientNameInput = $('#clientNameInput')
    let typeNameInput = $('#typeNameInput')
    let idCaseInput = $('#idCaseInput')
    let caseNoteInput = $('#caseNoteInput')
    let caseWorkflowInput = $('#caseWorkflowInput')

    let caseContainerAll = $('.cases__container--all')
    let casesHeaderSpan = $('.cases__header span')
    let noCasesContainer = $('.no__cases--container')
    let header = $('header')

    let allFilters = $('.filter__list')
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


    function updateClientInArray(target, client) {
        for ( let i = 0; i < casesArray.length; i++){
            if(casesArray[i].id === target) {
                casesArray[i].client = client
                break;
            }
        }
    }

    function updateTypeInArray(target, type) {
        for ( let i = 0; i < casesArray.length; i++){
            if(casesArray[i].id === target) {
                casesArray[i].type = type
                break;
            }
        }
    }

    function updateNoteInArray(target, note) {
        for ( let i = 0; i < casesArray.length; i++){
            if(casesArray[i].id === target) {
                casesArray[i].note = note
                break;
            }
        }
    }

    function updateStepInArray(target, step) {
        for ( let i = 0; i < casesArray.length; i++){
            if(casesArray[i].id === target) {
                casesArray[i].workflow = step
                break;
            }
        }
    }
    
    function updateDateInArray(target, date) {
        for ( let i = 0; i < casesArray.length; i++){
            if(casesArray[i].id === target) {
                casesArray[i].date = date
                break;
            }
        }
    }
    function updateDate(e){
        e.text(moment().format("DD/MM"))
    }

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
        if (idCaseInput.val() === '') {
            isValid = false
            addErrorClass(idCaseInput)
        }
        if (caseNoteInput.val() === ''){
            isValid = false
            addErrorClass(caseNoteInput)
        } 
        return isValid
    }  

    function addErrorClass(e){
        e.addClass('error');
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

        let iconNoteTemplate = `<div  class="case__buttons--icon--note has-note" data-id="${caseInfo.id}">
                                    <img src="../assets/file-text-outline.svg" alt="note">
                                </div>`

        let noteTemplate = `<div class="case__note" style="display:none;" data-id="${caseInfo.id}">
                                <input type="text" name="type" class="noteInput" value="${caseInfo.note}" data-id="${caseInfo.id}"></input>
                            </div>`

        let caseTemplate = `<div class="case__container ${cssClass}" data-id="${caseInfo.id} case">
                                <div class="case">
                                    <div class="case__item--client">
                                        <input type="text" name="client" class="clientInput" value="${caseInfo.client}" data-id="${caseInfo.id}">
                                    </div>
                                    <div class="case__item--type">
                                        <input type="text" name="type" class="typeInput" value="${caseInfo.type}" data-id="${caseInfo.id}">
                                    </div>
                                    <div class="case__item--date" data-id="${caseInfo.id}">${caseInfo.date}</div>
                                    <div class="case__item--workflow ">
                                        <select data-id="${caseInfo.id}" class="workflowInput">
                                            ${options}
                                        </select>
                                    </div>
                                    <div class="case__buttons">
                                        ${iconNoteTemplate}
                                        <div class="case__buttons--icon--link">
                                            <a href="https://teg.avature.net/Case#/${caseInfo.id}" target="_blank">
                                                <img src="../assets/link-2-outline.svg" alt="link">
                                            </a>
                                        </div>
                                        <div class="case__buttons--icon--remove" data-id="${caseInfo.id}">
                                            <img src="../assets/trash-2-outline.svg" alt="remove">
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

    function loadLocalStorage(){
        casesArray = JSON.parse(localStorage.getItem('casesList'))     
        if (casesArray === null){
            casesArray = []
        }
    }

    function showCases() {
    
        for (let i = 0; i < casesArray.length; i++) {
            
            const caseInfo = {
                client : casesArray[i].client,
                workflow : casesArray[i].workflow,
                type : casesArray[i].type,
                id : casesArray[i].id,
                note: casesArray[i].note,
                date: casesArray[i].date
            }
            
            caseContainerAll.append(printCase(caseInfo))
            
        }
        

        if (casesArray.length === 0){
            casesHeaderSpan.addClass('dNone')
        } else {
            noCasesContainer.addClass('dNone')
            header.removeClass('hideHeader')
            allFilters.children('.filter__list--item[data-filter="all"]').addClass('selected')
        }
        
    }
 
    loadLocalStorage()
    showCases()
    
    
   // WHEN CLICK CREATE A CASE FROM MODAL
    $('#buttonCreate').click( function(){

        let caseInfo = {
            client: clientNameInput.val(),
            type: typeNameInput.val(),
            workflow: $('#caseWorkflowInput option:selected').val(),
            id: idCaseInput.val(),
            note: caseNoteInput.val(),
            date: moment().format("DD/MM")
        }

        let isValid = validateForm()
        if (isValid) {
            modal.close()
            casesArray.push(caseInfo)
            caseContainerAll.append(printCase(caseInfo))
            
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
        let counter = key / 5
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
        updateClientInArray(target, newClient)
        saveInLocalStorage()
    })

    // UPDATE PORTAL TYPE
    caseContainerAll.on('change', '.typeInput', function(){
        let target = $(this).attr("data-id")
        let newType = $(this).val()
        updateTypeInArray(target, newType)
        saveInLocalStorage()
    })

    // UPDATE NOTE
    caseContainerAll.on('change','.noteInput', function(){
        let target = $(this).attr("data-id")
        let newNote = $(this).val()
        updateNoteInArray(target, newNote)
        saveInLocalStorage()
    })

    // UPDATE WORKFLOW
    caseContainerAll.on('change','.workflowInput', function(){
        let target = $(this).attr("data-id")
        let newStep = $(this).val()
        updateStepInArray(target, newStep)
        saveInLocalStorage()
    })

    // UPDATE DATE
    caseContainerAll.on('click','.case__item--date', function(){
        let targetData = $(this).attr('data-id')
        let target = $(this)
        updateDate(target)

        let targetTextValue = target.text()
        updateDateInArray(targetData, targetTextValue)
        saveInLocalStorage()
    })

    //SELECT WORKFLOW

    allFilters.on('click', '.filter__list--item', function(){
        let target = $(this)
        
        if (target.hasClass('selected')) {
            target.removeClass('selected');
        } else {
            $(".filter__list--item").removeClass('selected');
            target.addClass('selected');
        } 
    })

});