$(document).ready(function () {

    let clientNameInput = $('#clientNameInput')
    let typeNameInput = $('#typeNameInput')
    let idCaseInput = $('#idCaseInput')
    let caseStatusInput = $('#caseStatusInput')
    let caseNoteInput = $('#caseNoteInput')
    let caseContainer = $('.cases__container--all')

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
            caseContainer.append(printCase(caseInfo))
        }
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

        let caseTemplate = `<div class="case__container"><div class="case">
                                <div class="case__item--client">
                                    <input type="text" name="client" id="clientInput" value="${caseInfo.client}">
                                </div>
                                <div class="case__item--type">
                                    <input type="text" name="type" id="typeInput" value="${caseInfo.type}">
                                </div>
                                <div class="case__item--date">${caseInfo.date}</div>
                                <div class="case__item--status">
                                    <select id="caseStatus">
                                        <option value="Queue for Dev" selected>Queue for Dev</option>
                                        <option value="Sent to Case Owner">Sent to Case Owner</option>
                                        <option value="Development">Development</option>
                                        <option value="Code Review">Code Review</option>
                                        <option value="First Review" selected>First Review</option>
                                        <option value="In Qa">In QA</option>
                                        <option value="Changes and Feedback">Changes and Feedback</option>
                                        <option value="Bugfixing">Bugfixing</option>
                                        <option value="Merged">Merged</option>
                                    </select>
                                </div>
                                <div class="case__buttons">
                                    <div class="case__buttons--icon--note">
                                        <img src="../assets/file-text-outline.svg" alt="note">
                                    </div>
                                    <div class="case__buttons--icon--link">
                                        <a href="case.id">
                                            <img src="../assets/link-2-outline.svg" alt="note">
                                        </a>
                                    </div>
                                    <div class="case__buttons--icon--remove">
                                        <img src="../assets/trash-2-outline.svg" alt="note">
                                    </div>
                                </div>     
                            </div>
                            <div class="case__note">
                                <input type="text" name="type" id="noteInput" value="${caseInfo.note}"></p>
                            </div></div>`;
        
        return caseTemplate

    }

});