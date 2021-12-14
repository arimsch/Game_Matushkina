// ограничение игры по времени
var time = 15000;
var timerId;
// установка уровня сложности
var level = 0;

// ---- для игры 2 (поиск картинки с числом)
// текущее значение числа для поиска
var currentNum;
// число картинок
var countCards = 8;
// индекс id ячейки, где искомое значение числа
var trueId;
// текущий счет игры
var countForGame = 0;
// массив id c верными значениями
let numbers = [];
//служебная переменная для динамического создания объектов
var t = 0;
//проверка, что не выбраны лишнии цыфры
var bool = true;


// НАЧАЛО ---- Общие функции ----
function setLevel() {
    level = document.getElementById('s1').value;
    if (level == 0) time = 15000;
    if (level == 1) time = 10000;
    startSecond();
}

function rndNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printName() {
    document.getElementById('usname').innerText = localStorage.key(0);
}
// КОНЕЦ ---- Общие функции ----

// НАЧАЛО---- Игра2 ----
function startSecond() {
    printName();
    bool = true;
    if (timerId != undefined) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(alertTimer, time);
    numbers.length = 0;
    t = 0;
    var myNode = document.getElementById("block-img");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    document.getElementById('allCount').innerText = localStorage.getItem(localStorage.key(0));
    currentNum = rndNum(0, 9);
    parsNum(currentNum);
    trueId = rndNum(0, countCards - 1);
    document.getElementById('a' + trueId).innerText = currentNum;
    numbers.push(currentNum);
    for (let i = 0; i < countCards; i++) {
        if (i == trueId) {
            continue;
        }
        var temp = rndNum(0, 9);
        document.getElementById('a' + i).innerText = temp;
        if (temp == currentNum) {
            numbers.push(currentNum);
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
    var temp = document.getElementById(id).innerText;
    makeT(temp, id);
    if ((temp == currentNum) && (numbers.length > 0)) {
        numbers.pop();
    }
    if (temp != currentNum) {
        bool = false;
    }
}

function check() {
    if (level == 0) {
        if (numbers.length == 0 && bool) {
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
            startSecond();
        } else {
            sumLess(1);
            swal({
                title: 'Ошибка! -1 балл',
                text: "Прожолжай так же!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            startSecond();
        }
    }
    if (level == 1) {
        if (numbers.length == 0 && bool) {
            sumMore(2);
            swal({
                title: 'Верно! +2 балл',
                text: "Прожолжай так же!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            startSecond();
        } else {
            sumLess(2);
            swal({
                title: 'Ошибка! -2 балл',
                text: "Прожолжай так же!",
                position: "top",
                allowOutsideClick: false,
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1000
            });
            startSecond();
        }

    }
}

function sumMore(num) {
    countForGame += num;
    var t = Number(localStorage.getItem(localStorage.key(0))) + num;
    localStorage.setItem(localStorage.key(0), t);
    if (countForGame >= 5) {
        swal("Поздравляем! Уровень пройден! ");
        window.location.href = '../content/p3.html';
    }
}

function sumLess(num) {
    if (countForGame >= (num))
        countForGame -= num;
    var t = Number(localStorage.getItem(localStorage.key(0)));
    if (t >= num)
        localStorage.setItem(localStorage.key(0), t - num);
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
    startSecond();
}

var picHolder;
var newRow;
var newCell;

function makeT(str, className) {
    if (t == 0) {
        picHolder = document.getElementById("block-img");
        newRow = picHolder.insertRow(0);
    }
    newCell = newRow.insertCell(t);
    newCell.setAttribute('class', className);
    newCell.innerHTML = str;
    t++;
    document.getElementById(className).innerHTML = " ";
}

function goBack() {
    window.location.href = '../content/p1_text-img.html';
}
// конец ---- Игра2----