// ограничение игры по времени
var time = 15000;
var timerId;
// установка уровня сложности
var level = 0;

// ---- для игры 1 (поиск картинки с числом)
// текущее значение числа для поиска
var currentNum;
// число картинок
var countCards = 8;
// индекс id ячейки, где искомое значение числа
var trueId;
// текущий счет игры
var countForGame = 0;

// НАЧАЛО ---- Общие функции ----
function setLevel() {
    level = document.getElementById('s1').value;
    if (level == 0) time = 15000;
    if (level == 1) time = 10000;
    start();
}

function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function init(id) {
    localStorage.clear();
    userName = document.getElementById(id).value;
    localStorage.setItem(userName, 0);
}

function printName() {
    document.getElementById('usname').innerText = localStorage.key(0);
    document.getElementById('curCount').innerText = countForGame;
}
// КОНЕЦ ---- Общие функции ----

// НАЧАЛО ---- Игра1 (текст-картинка) ----
function start() {
    if (timerId != undefined) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(alertTimer, time);
    document.getElementById('curCount').innerText = countForGame;
    currentNum = rndNum(0, 9);
    parsNum(currentNum);
    trueId = rndNum(0, countCards - 1);
    document.getElementById('a' + trueId).innerText = currentNum;
    for (let i = 0; i < countCards; i++) {
        if (i == trueId) {
            continue;
        }
        var temp = rndNum(0, 9);
        if (temp != currentNum) {
            document.getElementById('a' + i).innerText = temp;
        } else {
            if (temp != 0) { document.getElementById('a' + i).innerText = temp - 1; } else { document.getElementById('a' + i).innerText = temp + 1; }
        }
    }
}

function parsNum(num) {
    switch (num) {
        case 0:
            document.getElementById('textNum').innerText = 'ноль';
            break;
        case 1:
            document.getElementById('textNum').innerText = 'один';
            break;
        case 2:
            document.getElementById('textNum').innerText = 'два';
            break;
        case 3:
            document.getElementById('textNum').innerText = 'три';
            break;
        case 4:
            document.getElementById('textNum').innerText = 'четыре';
            break;
        case 5:
            document.getElementById('textNum').innerText = 'пять';
            break;
        case 6:
            document.getElementById('textNum').innerText = 'шесть';
            break;
        case 7:
            document.getElementById('textNum').innerText = 'семь';
            break;
        case 8:
            document.getElementById('textNum').innerText = 'восемь';
            break;
        case 9:
            document.getElementById('textNum').innerText = 'девять';
            break;
    }
}

function clickOncard(id) {
    if (id == ("a" + trueId)) {
        if (level == 0) {
            sumMore(level + 1);
            swal({
                title: 'Верно! +1 балл',
                text: "Прожолжай так же!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            start();
        };
        if (level == 1) {
            sumMore(level + 2);
            swal({
                title: 'Верно! +2 балла',
                text: "Прожолжай так же!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            start();
        };
    } else {
        if (level == 0) {
            sumLess(level + 1);
            swal({
                title: 'Ошибка! -1 балл',
                text: "Попробуй еще раз!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            document.getElementById('curCount').innerText = countForGame;
        };
        if (level == 1) {
            sumLess(level + 2);
            swal({
                title: 'Ошибка! -2 балла',
                text: "Попробуй еще раз!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            document.getElementById('curCount').innerText = countForGame;
        }
    }
}

function sumMore(num) {
    countForGame += num;
    if (countForGame == 5) {
        swal("Поздравляем! Уровень пройден!");
        var t = localStorage.getItem(localStorage.key(0));
        localStorage.setItem(localStorage.key(0), t + countForGame);
        alert(localStorage.getItem(localStorage.key(0)));
        window.location.href = '../content/p2.html';
    }
}

function sumLess(num) {
    if (countForGame >= (num))
        countForGame -= num;
}

function alertTimer() {
    swal({
        title: "Время вышло",
        text: "Попробуй еще раз!",
        position: "bottom",
        backdrop: "linear-gradient(yellow, wheat)",
        background: "white",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 1500
    });
    start();
}
// конец ---- Игра1 (текст-картинка) ----







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