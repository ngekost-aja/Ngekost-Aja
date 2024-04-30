document.addEventListener('DOMContentLoaded', function() {
    var btnBack = document.getElementById('btn-back');
    var btnContinue = document.getElementById('btn-continue');
    var formStep1 = document.getElementById('form-step-1');
    var formStep2 = document.getElementById('form-step-2');
    var progressBar = document.getElementById('progress-bar-payment');
    var progressBarContainer = document.getElementById('progress-bar-payment-container');

    btnContinue.addEventListener('click', () => {
        formStep1.style.display = 'none';
        formStep2.style.display = 'block';
        progressBar.style.width = adjustWidth('up')
    });

    btnBack.addEventListener('click', () => {
        formStep2.style.display = 'none';
        formStep1.style.display = 'block';
        progressBar.style.width = adjustWidth('down');
    });

    function adjustWidth(instruction) {
        const computedStyle = window.getComputedStyle(progressBar);
        const width = computedStyle.getPropertyValue('width');
        const parentWidth = progressBar.parentElement.clientWidth;
        if (instruction == 'up') {
            if (width == '0px') {
                return '50%';
            } else {
                return '100%';
            }
        } else {
            if (width == `${parentWidth}px`) {
                return '50%';
            } else {
                return '0%'
            }
        }
    }
});