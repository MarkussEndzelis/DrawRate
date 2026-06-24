const COMMENTS = {
    great: [
        "Picasso would be proud.",
        "Are you secretly an artist?",
        "Thats actually really good, not gonna lie.",
        "Im impressed. Genuinely.",
        "Someones been practising..."
    ],
    ok: [
        "I can kind of see it... maybe.",
        "Not bad, not great. Very mid.",
        "Your mom would hang this on the fridge. Maybe.",
        "Its giving... something.",
        "Ive seen worse. Barely."
    ],
    meh: [
        "Was this drawn with your eyes closed?",
        "Bold of you to submit this.",
        "I think I see it. No wait, I dont.",
        "A for effort. D for execution.",
        "My 5 year old cousin could do better."
    ],
    bad: [
        "What is this supposed to be?",
        "I genuinely cannot tell.",
        "Did you even try?",
        "My 3 year old draws better. With their feet.",
        "This is a cry for help and Im concerned."
    ]
};

function rateDrawing(strokeCount, pixelsFilled, timeUsed, complexity){
    let score = 0;

    if(strokeCount === 0){
        return {score: 0, comment: "You didnt draw anything...", colorClass: 'score-bad'};
    }

    const strokeScore = Math.min(strokeCount / 8, 1) * 35;
    score += strokeScore;

    const coverageScore = Math.min(pixelsFilled / 300, 1) * 30;
    score += coverageScore;

    const timeScore = Math.min(timeUsed / 45, 1) * 20;
    score += timeScore;

    if(complexity === 'easy'){
        score *= 1.1;
    }else if(complexity === 'hard'){
        score *= 0.9;
    }

    score += (Math.random() * 20) - 10;

    score = Math.round(Math.max(5, Math.min(99, score)));

    let comment, colorClass;

    if(score >= 75){
        comment = COMMENTS.great[Math.floor(Math.random() * COMMENTS.great.length)];
        colorClass = 'score-great';
    }else if(score >= 50){
        comment = COMMENTS.ok[Math.floor(Math.random() * COMMENTS.ok.length)];
        colorClass = 'score-ok';
    }else if(score >= 25){
        comment = COMMENTS.meh[Math.floor(Math.random() * COMMENTS.meh.length)];
        colorClass = 'score-meh';
    }else{
        comment = COMMENTS.bad[Math.floor(Math.random() * COMMENTS.bad.length)];
        colorClass = 'score-bad';
    }

    return {score, comment, colorClass};
}