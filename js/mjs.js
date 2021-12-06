var time = 5000;

function setLevel() {
    var a = document.getElementById('s1').value;
    if (a == 0) time = 5000;
    if (a == 1) time = 10000;
    start();
}

function start() {
    setTimeout(alertTimer, time);
}

function alertTimer() {
    swal({
        title: "Alert Set on Timer",
        text: "This alert will disappear after 3 seconds.",
        position: "bottom",
        backdrop: "linear-gradient(yellow, orange)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1000
    });
}

function s(id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");

    // drawAnimateText(ctx, 20, 20, "Пример", "Times New Roman", "100px", "#F00");
    drawAnimateText(ctx, 0, 120, "9", "Impact", "200px", "green", 50, 4, 20);
    // drawAnimateText(ctx, 0, 300, "TEST 2", "Arial", "30px", "#AEAEAE", 1, 2, 3);
}

function drawAnimateText(ctx, x, y, text, fontFarmily, fontSize, color, scanStep, radius, drawCount) {
    scanStep = scanStep || 10; //Шаг сканирование текста
    radius = radius || 1; //Радиус кругов
    drawCount = drawCount || 10
    var arr = getPositions(fontFarmily, fontSize, text, scanStep);
    (function() {
        ctx.fillStyle = color;
        ctx.font = fontSize + " " + fontFarmily;
        for (var i = 0; i < drawCount; i++) {
            if (arr.length <= 0) return;
            var inx = Math.floor(Math.random() * arr.length);
            var cords = arr[inx];
            arr.splice(inx, 1);
            ctx.beginPath();
            ctx.arc(x + cords[0], y + cords[1], radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimationFrame(arguments.callee);
    })();
}

function getPositions(font, fontSize, text, step) {
    var tmpCanvas = document.createElement("canvas");
    var tmpCtx = tmpCanvas.getContext("2d");
    tmpCtx.font = fontSize + " " + font;
    var h = parseInt(tmpCtx.font.match(/\d+/), 10);
    var w = tmpCtx.measureText(text).width;
    tmpCanvas.width = w;
    tmpCanvas.height = h * 1.5;
    tmpCtx.fillStyle = "black";
    tmpCtx.font = fontSize + " " + font;
    tmpCtx.fillText(text, 0, h);
    var imageData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
    var data = imageData.data;
    var _step = 4 * step;
    var arr = [];
    var minH = tmpCanvas.height;
    for (var i = 0; i < data.length; i += _step) {
        if (data[i + 3] != 0) {
            var x = parseInt(i / 4) % tmpCanvas.width;
            var y = parseInt(parseInt(i / 4) / tmpCanvas.width);
            minH = Math.min(minH, y);
            arr.push([x, y]);
        }
    }
    for (var i = 0; i < arr.length; i++)
        arr[i][1] -= minH;
    return arr;
}