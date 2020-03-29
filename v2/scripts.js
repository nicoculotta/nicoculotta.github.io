let casesArray = []

$(document).ready(function () {

    let clientNameInput = $('#clientNameInput')
    let typeNameInput = $('#typeNameInput')
    let idCaseInput = $('#idCaseInput')
    let caseStatusInput = $('#caseStatusInput')
    let caseNoteInput = $('#caseNoteInput')
    let caseContainerAll = $('.cases__container--all')

    
    let modal = $('.remodal').remodal()


   
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
    })



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
                                <input type="text" name="type" id="noteInput" value="${caseInfo.note}"></input>
                            </div>`

        let caseTemplate = `<div class="case__container" data-id="${caseInfo.id}">
                                <div class="case">
                                    <div class="case__item--client">
                                        <input type="text" name="client" id="clientInput" value="${caseInfo.client}">
                                    </div>
                                    <div class="case__item--type">
                                        <input type="text" name="type" id="typeInput" value="${caseInfo.type}">
                                    </div>
                                    <div class="case__item--date">${caseInfo.date}</div>
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

});