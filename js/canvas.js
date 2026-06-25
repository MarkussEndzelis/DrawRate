let canvas, ctx;
let isDrawing = false;
let currentTool = 'pen';
let lastX = 0;
let lastY = 0;
let strokeCount = 0;
let pixelsFilled = 0;

function initCanvas(){
    canvas = document.getElementById('drawCanvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokeCount = 0;
    pixelsFilled = 0;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        lastX = (touch.clientX - rect.left) * scaleX;
        lastY = (touch.clientY - rect.top) * scaleY;
        isDrawing = true;
        strokeCount++;
    });

    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        if(!isDrawing){
            return;
        }
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;
        drawLine(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
    });
    canvas.addEventListener('touchend', () => {isDrawing = false; });
}

function getPos(e){
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return{
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function startDraw(e){
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    strokeCount++;
}

function draw(e){
    if(!isDrawing){
        return;
    }
    const pos = getPos(e);
    drawLine(lastX, lastY, pos.x, pos.y);
    lastX = pos.x;
    lastY = pos.y;
}

function stopDraw(){
    isDrawing = false;
}

function drawLine(x1, y1, x2, y2){
    if(currentTool === 'pen'){
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
    }else{
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 24;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    pixelsFilled++;
}

function setTool(tool){
    currentTool = tool;
    document.getElementById('penBtn').classList.toggle('active', tool === 'pen');
    document.getElementById('eraserBtn').classList.toggle('active', tool === 'eraser');
}

function clearCanvas(){
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    strokeCount = 0;
    pixelsFilled = 0;
}

function getCanvasData(){
    return{
        imageData: canvas.toDataURL('image/png'),
        strokeCount,
        pixelsFilled
    };
}