const TOTAL_ROUNDS = 5;
let currentRound = 0;
let scores = [];
let currentWord = null;

function startGame(){
    currentRound = 0;
    scores = [];
    showScreen('gameScreen');
    nextRound();
}

function nextRound(){
    currentRound++;
    document.getElementById('roundNum').textContent = currentRound;
    document.getElementById('totalRounds').textContent = TOTAL_ROUNDS;

    currentWord = getRandomWord();
    document.getElementById('wordDisplay').textContent = currentWord.word;
    document.getElementById('referenceImage').src = currentWord.refImage;

    document.getElementById('roundResult').classList.add('hidden');
    document.getElementById('submitBtn').disabled = false;

    initCanvas();
    setTool('pen');

    startTimer(null, () => {
        submitDrawing();
    });
}

async function submitDrawing(){
    stopTimer();
    document.getElementById('submitBtn').disabled = true;

    const {strokeCount, colorsUsed} = getCanvasData();

    const scoreEl = document.getElementById('roundScore');
    scoreEl.textContent = '...';
    scoreEl.className = 'score-num';
    document.getElementById('roundComment').textContent = 'Scoring your drawing...';
    document.getElementById('roundResult').classList.remove('hidden');

    let score, comment;

    try {
        const refCanvas = await loadImageToCanvas(currentWord.refImage);
        const refMask = getBinaryMask(refCanvas);
        const drawMask = getBinaryMask(canvas);
        const iou = compareMasks(refMask, drawMask);
        const drawInkCount = drawMask.reduce((a, b) => a + b, 0);

        score = Math.round(Math.min(99, Math.max(1, iou * 100)));

        // Almost nothing drawn (a dot, a tiny scribble) = force near-zero score
        if (drawInkCount < 5) {
            score = Math.floor(Math.random() * 4) + 1; // 1-4%
        } else if (drawInkCount < 12) {
            score = Math.min(score, 10);
        }

        comment = score >= 75 ? "Great match!" : score >= 45 ? "Recognizable" : "Rough shape, keep trying!";
    }catch(e){
        console.error("Comparison error:", e);
        score = Math.round(Math.min(99, Math.max(5, strokeCount * 3 + colorsUsed * 5)));
        comment = "Backup scoring used."
    }

    scores.push(score);

    const colorClass = score >= 75 ? 'score-great' : score >= 50 ? 'score-ok' : score >= 25 ? 'score-meh' : 'score-bad';
    scoreEl.textContent = score + '%';
    scoreEl.className = 'score-num ' + colorClass;
    document.getElementById('roundComment').textContent = comment;

    const nextBtn = document.getElementById('nextbtn');
    if(currentRound >= TOTAL_ROUNDS){
        nextBtn.textContent = 'See Results ->';
        nextBtn.onclick = showFinalScreen;
    }else{
        nextBtn.textContent = 'Next Round ->';
        nextBtn.onclick = nextRound;
    }
}

function showFinalScreen(){
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    const scoreEl = document.getElementById('finalScore');
    scoreEl.textContent = avg + '%';

    if(avg >= 75){
        scoreEl.style.color = '#6bcb77';
        document.getElementById('finalComment').textContent = "You are actually really good at this. Respect.";
    }else if(avg >= 50){
        scoreEl.style.color = '#ffd93d';
        document.getElementById('finalComment').textContent = "Decent. Not amazing, not terrible.";
    }else if(avg >= 25){
        scoreEl.style.color = '#ff9a3c';
        document.getElementById('finalComment').textContent = "Art is not in your future. Atleast you tried."
    }else{
        scoreEl.style.color = '#ff6b6b';
        document.getElementById('finalComment').textContent = "Please never draw again."
    }
    showScreen('resultScreen');
}

function showScreen(id){
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
}