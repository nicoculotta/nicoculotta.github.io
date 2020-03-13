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
            recoverStatusCase()
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

        /* let caseStatusSelected = caseStatusInput */

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
                                    <div class="case__buttons--icon--note">
                                        <img src="../assets/file-text-outline.svg" alt="note">
                                    </div>
                                    <div class="case__buttons--icon--link">
                                        <a href="https://teg.avature.net/Case#/${caseInfo.id}">
                                            <img src="../assets/link-2-outline.svg" alt="link">
                                        </a>
                                    </div>
                                    <div class="case__buttons--icon--remove">
                                        <img src="../assets/trash-2-outline.svg" alt="remove">
                                    </div>
                                </div>     
                            </div>
                            <div class="case__note">
                                <input type="text" name="type" id="noteInput" value="${caseInfo.note}"></p>
                            </div></div>`;
        
        return caseTemplate
    }

    function recoverStatusCase(){
        
        let caseStatusCard = $('#caseStatus')
        statusValue = caseStatusInput.val()

        if (statusValue === "A"){
            caseStatusCard.attr("selected","selected");
            console.log('seleccionaste a A' + caseStatusCard)
        } else if (statusValue === "B"){
            caseStatusCard.attr("selected","selected"); 
            console.log('seleccionaste a B' + caseStatusCard)
        }
        else if (statusValue === "C"){
            caseStatusCard.attr("selected","selected"); 
            console.log('seleccionaste a A'  + caseStatusCard)
        }
        else if (statusValue === "D"){
            caseStatusCard.attr("selected","selected"); 
        }
        
        
    }

});