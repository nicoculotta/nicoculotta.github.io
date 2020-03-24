let casesArray = []
$(document).ready(function () {

    let clientNameInput = $('#clientNameInput')
    let typeNameInput = $('#typeNameInput')
    let idCaseInput = $('#idCaseInput')
    let caseStatusInput = $('#caseStatusInput')
    let caseNoteInput = $('#caseNoteInput')
    let caseContainer = $('.cases__container--all')

    
    let modal = $('.remodal').remodal()

    let dataCounter = 0

   
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
            caseContainer.append(printCase(caseInfo))
            dataCounter++ 
        }
    })


     $('body').on('click', function(e) {
        
        if ($(e.target).hasClass('case__buttons--icon--note') || $(e.target)[0].tagName === 'IMG' ){
            
            $(this).find(".case__note").toggle()
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

/*     function hasSameId(id){
        for (let i=0; i < casesArray.length; i++){
            if (casesArray[i].id === id ){
                addErrorClass(idCaseInput)
                return true
            }
        }
    } */

    function printCase(caseInfo){

        let iconNoteTemplate = `<div class="case__buttons--icon--note has-note" data-counter="${dataCounter}">
                                    <img src="../assets/file-text-outline.svg" alt="note" data-counter="${dataCounter}">
                                </div>`;
        let noteTemplate = `<div class="case__note" style="display:none;" data-counter="${dataCounter}">
                                <input type="text" name="type" id="noteInput" value="${caseInfo.note}"></input>
                            </div>`

        let caseTemplate = `<div class="case__container" data-counter="${dataCounter}">
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
                                            <a href="https://teg.avature.net/Case#/${caseInfo.id}">
                                                <img src="../assets/link-2-outline.svg" alt="link">
                                            </a>
                                        </div>
                                        <div class="case__buttons--icon--remove">
                                            <img src="../assets/trash-2-outline.svg" alt="remove">
                                        </div>
                                    </div>     
                                </div>
                                ${noteTemplate}
                            </div>`;
        
        return caseTemplate
    }

});