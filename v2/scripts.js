let casesArray = []

$(document).ready(function () {

    /* ELEMENT FORM */
    let clientNameInput = $('#clientNameInput')
    let typeNameInput = $('#typeNameInput')
    let idCaseInput = $('#idCaseInput')
    let caseStatusInput = $('#caseStatusInput')
    let caseNoteInput = $('#caseNoteInput')

    let caseContainerAll = $('.cases__container--all')
    let casesHeaderSpan = $('.cases__header span')
    let noCasesContainer = $('.no__cases--container')
    let modal = $('.remodal').remodal()

    
   // WHEN CLICK CREATE A CASE FROM MODAL
    $('#buttonCreate').click( function(){

        let caseInfo = {
            client: clientNameInput.val(),
            status: caseStatusInput.val(),
            type: typeNameInput.val(),
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
            saveInLocalStorage()
        }
        if (casesArray.length > 0) {
            casesHeaderSpan.removeClass('dNone')
        }
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
        }  
    })

    // UPADATE CLIENTE
    caseContainerAll.on('change', '.clientInput', function(){
        let target = $(this).attr("data-id")
        let newClient = $(this).val()
        updateClientInArray(target, newClient)
        saveInLocalStorage()
    })

    // UPADATE PORTAL TYPE
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

    // UPDATE DATE
    caseContainerAll.on('click','.case__item--date', function(){
        let targetData = $(this).attr('data-id')
        let target = $(this)
        updateDate(target)

        let targetTextValue = target.text()
        updateDateInArray(targetData, targetTextValue)
        saveInLocalStorage()
    })

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
        if (idCaseInput.val() === ''){
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

        let iconNoteTemplate = `<div  class="case__buttons--icon--note has-note" data-id="${caseInfo.id}">
                                    <img src="../assets/file-text-outline.svg" alt="note">
                                </div>`

        let noteTemplate = `<div class="case__note" style="display:none;" data-id="${caseInfo.id}">
                                <input type="text" name="type" class="noteInput" value="${caseInfo.note}" data-id="${caseInfo.id}"></input>
                            </div>`

        let caseTemplate = `<div class="case__container" data-id="${caseInfo.id}">
                                <div class="case">
                                    <div class="case__item--client">
                                        <input type="text" name="client" class="clientInput" value="${caseInfo.client}" data-id="${caseInfo.id}">
                                    </div>
                                    <div class="case__item--type">
                                        <input type="text" name="type" class="typeInput" value="${caseInfo.type}" data-id="${caseInfo.id}">
                                    </div>
                                    <div class="case__item--date" data-id="${caseInfo.id}">${caseInfo.date}</div>
                                    <div class="case__item--status">
                                        <select id="caseStatus">
                                            <option value="A">Queue for Dev</option>
                                            <option value="B">Sent to Case Owner</option>
                                            <option value="C">Development</option>
                                            <option value="D">Code Review</option>
                                            <option value="E">First Review</option>
                                            <option value="F">In QA</option>
                                            <option value="G">Changes and Feedback</option>
                                            <option value="H">Bugfixing</option>
                                            <option value="I">Merged</option>
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
                status : casesArray[i].status,
                type : casesArray[i].type,
                id : casesArray[i].id,
                note: casesArray[i].note,
                date: casesArray[i].date
            }
            
            caseContainerAll.append(printCase(caseInfo))
        }
    }
  
    loadLocalStorage()
    showCases()

        
    if (casesArray.length === 0){
        casesHeaderSpan.addClass('dNone')
    }  


    // ANIMATION CASES
    let caseContainer = $('.case__container')
    $.each(caseContainer, function(key){
        let counter = key / 5
        $(this).css('animation-delay', `${counter}` + 's')
    })


});