function getBinaryMask(sourceCanvas, gridSize = 40){
    const ctx = sourceCanvas.getContext('2d');
    const {width, height} = sourceCanvas;
    const imgData = ctx.getImageData(0, 0, width, height).data;

    let minX = width, minY = height, maxX = 0, maxY = 0;
    for (let y = 0; y < height; y++){
        for (let x = 0; x < width; x++){
            const i = (y * width + x) * 4;
            const alpha = imgData[i + 3];
            const isWhite = imgData[i] > 240 && imgData[i+1] > 240 && imgData[i+2] > 240;
            const hasInk = alpha > 10 && !isWhite;
            if (hasInk){
               if (x < minX) minX = x;
               if (x > maxX) maxX = x;
               if (y < minY) minY = y;
               if (y > maxY) maxY = y;
            }
        }
    }

    if (maxX <= minX || maxY <= minY){
        return new Uint8Array(gridSize * gridSize);
    }

    const boxW = maxX - minX;
    const boxH = maxY - minY;

    // scale PROPORTIONALLY to fit inside grid with padding, centered
    const padRatio = 0.15;
    const usableSize = gridSize * (1 - 2 * padRatio);
    const scale = Math.min(usableSize / boxW, usableSize / boxH, 1);
    const destW = boxW * scale;
    const destH = boxH * scale;
    const destX = (gridSize - destW) / 2;
    const destY = (gridSize - destH) / 2;

    const tmp = document.createElement('canvas');
    tmp.width = gridSize;
    tmp.height = gridSize;
    const tctx = tmp.getContext('2d');
    tctx.drawImage(sourceCanvas, minX, minY, boxW, boxH, destX, destY, destW, destH);

    const small = tctx.getImageData(0, 0, gridSize, gridSize).data;
    const mask = new Uint8Array(gridSize * gridSize);
    for (let p = 0; p < gridSize * gridSize; p++){
        const i = p * 4;
        const alpha = small[i + 3];
        const isWhite = small[i] > 240 && small[i + 1] > 240 && small[i + 2] > 240;
        mask[p] = (alpha > 10 && !isWhite) ? 1 : 0;
    }
    return mask;
}

function dilateMask(mask, gridSize){
    const out = new Uint8Array(mask.length);
    for (let y = 0; y < gridSize; y++){
        for (let x = 0; x < gridSize; x++){
            const idx = y * gridSize + x;
            if (mask[idx] === 1){
                out[idx] = 1;
                continue;
            }
            for (let dy = -1; dy <= 1; dy++){
                for (let dx = -1; dx <= 1; dx++){
                    const ny = y + dy, nx = x + dx;
                    if (ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize){
                        if (mask[ny * gridSize + nx] === 1){
                            out[idx] = 1;
                        }
                    }
                }
            }
        }
    }
    return out;
}

function compareMasks(maskA, maskB, gridSize = 40){
    const dilatedA = dilateMask(maskA, gridSize);
    const dilatedB = dilateMask(maskB, gridSize);

    let intersection = 0, union = 0;
    for (let i = 0; i < maskA.length; i++){
        if (dilatedA[i] === 1 || dilatedB[i] === 1) union++;
        if (dilatedA[i] === 1 && dilatedB[i] === 1) intersection++;
    }
    return union === 0 ? 0 : intersection / union;
}

async function loadImageToCanvas(url){
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = url;
    });
    const c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;
    c.getContext('2d').drawImage(img, 0, 0);
    return c;
}