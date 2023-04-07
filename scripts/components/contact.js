
const textArea = document.getElementById('contact-message');
const charCounter = document.getElementById('message-counter');

const submitButton = document.getElementById('submit-button');
const snackBar = document.getElementById('form-snackbar');


//////////////////////////////TEXTAREA STUFF//////////////////////////////

const maxValueOfTextarea = 500;

const minValueOfTextarea = 12;

textArea.maxLength = maxValueOfTextarea;
textArea.minLength = minValueOfTextarea;


charCounter.textContent = `${maxValueOfTextarea}/${maxValueOfTextarea}`;

textArea.addEventListener('input', () => {
    const numOfEnterChar = textArea.value.length;
    const counter = maxValueOfTextarea - numOfEnterChar;

    charCounter.textContent = counter + '/' + maxValueOfTextarea;
    if (counter < maxValueOfTextarea / 2) {
        charCounter.style.color = 'orange';
    } else if (counter < 0) {
        charCounter.style.color = 'darkred';
    } else {
        charCounter.style.color = 'white';
    }

});

//////////////////////////////FORM CHECKING//////////////////////////////

submitButton.addEventListener('click', () => {

    const isEmailOK = emailChecker(document.getElementById('mail-input'));
    const isTextOK = textareaChecker(textArea);

    if (isEmailOK && isTextOK) {
        
        saveMessage()
        .then((resp) => {
            snackBar.className = 'show';
            snackBar.innerText = 'Your message has been successfully sent';
            setTimeout(() => {
                snackBar.className = snackBar.className.replace('show', '');
            }, 4000);

            resetForm();
        })
        .catch(err => {
            console.log(err)
        })

    };

});





function emailChecker(inputElem) {

    const mailPattern = /^\w+([+.-]?\w+){1,}@\w+([.-]?\w+)(.\w{2,4})+$/g;

    if (inputElem.value.match(mailPattern) === null) {
        inputElem.classList.add('invalid');
        return false;
    }
    return true;
}

function textareaChecker(textElem) {

    if (textElem.value.length < minValueOfTextarea || textElem.value.length > maxValueOfTextarea) {
        textArea.classList.add('invalid');
        return false;
    }
    return true;
}

function resetForm() {

    charCounter.style.color = '';
    document.getElementById('mail-input').value = '';
    textArea.value = '';
    textArea.classList.remove('invalid');
    document.getElementById('mail-input').classList.remove('invalid');
    charCounter.textContent = '';

}

//////////////////////////////POST MESSAGE//////////////////////////////

function saveMessage() {
    const URL = 'http://localhost:3000/messages';
    const messageBody = {
        email: document.getElementById('mail-input').value,
        message: document.getElementById('contact-message').value,
        date: new Date().toLocaleString()
    };
    const params = {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(messageBody)
    };


    return fetch(URL, params);
}