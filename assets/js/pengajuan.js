const btnBack = document.getElementById('btn-back')
const btnContinue = document.getElementById('btn-continue')
const formStep1 = document.getElementById('form-step-1')
const formStep2 = document.getElementById('form-step-2')
const formStep3 = document.getElementById('form-step-3')
const formStep4 = document.getElementById('form-step-4')
const progressBar = document.getElementById('progress-bar')
const progressBarContainer = document.getElementById('progress-bar-container')
const userFullData = document.getElementById('user-full-data')
const btnProcessData = document.getElementById('btn-process-data')
const processStatus = document.getElementById('process-status')
const processStatusText = document.getElementById('process-status-text')
const statusIcon = document.getElementById('status-icon')



let currentStage = 1

btnContinue.addEventListener('click', () => {
    console.log(currentStage)
    if (currentStage == 1) {
        formStep1.style.display = 'none'
        formStep2.style.display = 'block'
    } else if (currentStage == 2) {
        formStep2.style.display = 'none'
        formStep3.style.display = 'block'
    } else if (currentStage == 3) {
        formStep3.style.display = 'none'
        formStep4.style.display = 'block'
    }
    progressBar.style.width = adjustWidth('up')
    currentStage++
});

btnBack.addEventListener('click', () => {
    if (currentStage == 2) {
        formStep2.style.display = 'none';
        formStep1.style.display = 'flex';
    } else if (currentStage == 3) {
        formStep3.style.display = 'none'
        formStep2.style.display = 'block'
    } else if (currentStage == 4) {
        formStep4.style.display = 'none'
        formStep3.style.display = 'block'
    }
    progressBar.style.width = adjustWidth('down');
    currentStage--
});

function adjustWidth(instruction) {
    if (instruction == 'up') {
        if (currentStage == 1) {
            return '33%';
        } else if (currentStage == 2) {
            return '66%'
        } else if (currentStage == 3) {
            return '100%';
        }
    } else {
        if (currentStage == 4) {
            return '66%';
        } else if (currentStage == 3) {
            return '33%'
        } else if (currentStage == 2) {
            return '0%'
        }
    }
}

function changeUserData() {
    userFullData.disabled = userFullData.disabled == true ? false : true
}

btnProcessData.addEventListener('click', ()=> {
    processStatusText.textContent = 'Sedang diproses'
    statusIcon.style.backgroundColor = 'orange'
})