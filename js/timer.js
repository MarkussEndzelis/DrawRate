let timerInterval = null;
let timeLeft = 60;

function startTimer(onTick, onEnd){
    timeLeft = 60;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if(onTick){
            onTick(timeLeft);
        }
        if(timeLeft <= 0){
            stopTimer();
            if(onEnd){
                onEnd();
            }
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
    timerInterval = null;
}

function updateTimerDisplay(){
    const el = document.getElementById('timer');
    el.textContent = timeLeft;
    el.className = '';

    if(timeLeft <= 10){
        el.classList.add('danger');
    }else if(timeLeft <= 20){
        el.classList.add('warning');
    }
}

function getTimeUsed(){
    return 60 - timeLeft;
}