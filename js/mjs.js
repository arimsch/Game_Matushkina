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
    document.getElementById('curCount').innerText = "";
    start();
}

function color() {
    var levC = document.getElementById('s2').value;
    if (levC == 0) {
        document.body.style.backgroundImage = "url(../img/cloud.jpg)";
    }
    if (levC == 1) {
        document.body.style.backgroundImage = "url(../img/sun.jpg)";
    }
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
    document.getElementById('curCount').innerText = Number(localStorage.getItem(localStorage.key(0)));
}
// КОНЕЦ ---- Общие функции ----

// НАЧАЛО ---- Игра1 (текст-картинка) ----
function start() {
    if (timerId != undefined) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(alertTimer, time);
    document.getElementById('curCount').innerText = Number(localStorage.getItem(localStorage.key(0)));
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
            sumMore(1);
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
            sumMore(2);
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
            sumLess(1);
            swal({
                title: 'Ошибка! -1 балл',
                text: "Попробуй еще раз!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            document.getElementById('curCount').innerText = Number(localStorage.getItem(localStorage.key(0)));
        };
        if (level == 1) {
            sumLess(2);
            swal({
                title: 'Ошибка! -2 балла',
                text: "Попробуй еще раз!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            document.getElementById('curCount').innerText = "";
            document.getElementById('curCount').innerText = Number(localStorage.getItem(localStorage.key(0)));
        }
    }
}

function sumMore(num) {
    countForGame += Number(num);
    var t = Number(localStorage.getItem(localStorage.key(0)));
    t += num;
    localStorage.setItem(localStorage.key(0), t);
    if (countForGame == 5 || countForGame == 6) {
        window.location.href = '../content/p2.html';
    }
}


function sumLess(num) {
    if (countForGame >= (num)) {
        countForGame -= num;
    }
    var t = Number(localStorage.getItem(localStorage.key(0)));
    if (t >= num)
        t -= num;
    localStorage.setItem(localStorage.key(0), t);
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
    countForGame = 0;
    start();
}
// конец ---- Игра1 (текст-картинка) ----

function wr() {
    var text = 'username:' + localStorage.key(0) + '  count:' + localStorage.getItem(localStorage.key(0));
    document.write('<a href="data:text/plain;charset=utf-8,%EF%BB%BF' + encodeURIComponent(text) + '" download="text.txt">text.txt</a>');
    setTimeout(goBack, 5000);
}

function goBack() {
    window.location.href = '../content/finalPage.html';
}