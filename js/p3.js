var long;
var div = document.getElementById('txt');
var mas1 = ['машин', 'язык', 'груши', 'плавать'];
var mas2 = ['пять', 'мишура', 'ель'];
var mas3 = ['лопнуть', 'громко'];
var countText = [1, 2, 3];
var numOfText;
var res = false;
var countTrue = 0;

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
    var p = Math.floor(Math.random() * (max - min + 1)) + min;
    if (countText.indexOf(p) >= 0) {
        countText.splice(countText.indexOf(p), 1);
        return p;
    }
    if (countText.length == 0) {
        return 0;
    } else {
        p = countText[countText.length - 1];
        countText.splice(countText.indexOf(p), 1);
        return p;
    }
}
// НАЧАЛО ---- Игра3----
function wrapWords() {
    document.getElementById('usname').innerText = localStorage.key(0);
    document.getElementById('allCount').innerText = Number(localStorage.getItem(localStorage.key(0)));
    var html = div.innerHTML;
    var words = html.split(/ /);
    console.log(words);
    var newHtml = '';
    for (var i = 0; i < words.length; i++) {
        newHtml += '<span>' + words[i] + '</span> ';
    }
    div.innerHTML = newHtml;
    long = newHtml.length;
}

div.addEventListener('click', function(event) {
    var target = event.target;
    if (target.innerHTML.length != long) {
        target.setAttribute("class", "highlight");
    }
});

div.addEventListener('dblclick', function(event) {
    var target = event.target;
    if (target.innerHTML.length != long) {
        target.removeAttribute("class");
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        texts();
    }
});

function text() {
    var s = rndNum(1, 3);
    eval('text' + s)();
    numOfText = s;
}

function texts() {
    text();
}

function text1() {
    mas1 = ['машин', 'язык', 'груши', 'плавать'];
    document.getElementById('txt').innerText = 'Леопард является видом хищных машин млекопитающих семейства кошачьих. В древние времена существовало мнение язык о том, что леопард не что иное как гибрид груши пантеры и льва. Именно это предположение вылилось в название животного, соединив в себе два греческих слова: «леон» ( что в переводе означает «лев» ) и «пардос» ( что в переводе означает плавать пантера ).';
    wrapWords();
}

function text0() {
    window.location.href = '../content/p3.html';
}

function text2() {
    mas1 = mas2;
    document.getElementById('txt').innerText = 'Информированный пять человек - быстро читающий человек. Быстро читали многие великие люди. Некоторым людям способности, необходимые для скорочтения, даны мишура с рождения. Другие получили их в результате ель запойного чтения в детстве. Остальные обладатели навыков скорочтения приобрели последние в результате обучения.';
    wrapWords();
}

function text3() {
    mas1 = mas3;
    document.getElementById('txt').innerText = 'Представьте, что фокус вашего взгляда похож на луч прожектора и вы можете то расширять его, то сужать. Возьмите в руки лопнуть секундомер, книгу формата А5 (это стандартный книжный размер), расслабьтесь и громко начинайте водить своим «лучом» по нескольким строчкам сначала слева направо, а затем справа налево.';
    wrapWords();
}

function finish() {
    swal({
        title: 'Похоже, тексты закончились!....',
        text: "Смело переходи к результатам!",
        position: "top",
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000
    });
}

var prog = false;

function check() {
    countTrue = 0;
    var e = (document.getElementsByClassName("highlight"));
    for (var i = 0; i < e.length; i++) {
        prog = false;
        // console.log(i);
        for (var k = 0; k < mas1.length; k++) {
            // console.log(k);
            // console.log(e[i].innerText);
            if ((mas1[k]) == e[i].innerText) {
                e[i].style.backgroundColor = "green";
                prog = true;
                break;
            }
            if ((mas1[k]) != e[i].innerText) {
                e[i].style.backgroundColor = "crimson";
            }
        }
        if (prog) {
            countTrue++;
        } else {
            countTrue--;
        }
    }
    if (countTrue == mas1.length) {
        var t = Number(localStorage.getItem(localStorage.key(0))) + Number(5);
        localStorage.setItem(localStorage.key(0), t);
        swal({
            title: 'Всё верно, +5 баллов',
            text: "Переходи к результатам или продолжай игру",
            position: "top",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 3000
        });
        setTimeout(text, 4000);
    }
    if (countTrue != mas1.length) {
        countTrue = 0;
        var p = Number(localStorage.getItem(localStorage.key(0)));
        if (localStorage.getItem(localStorage.key(0)) > 1) {
            localStorage.setItem(localStorage.key(0), p - 2);
        }
        swal({
            title: 'Есть ошибки, -2 балла',
            text: "Попробуй еще раз",
            position: "top",
            allowOutsideClick: false,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000
        });
        setTimeout(eval('text' + numOfText), 2500);
    }
}

function reloadPag() {
    window.location.reload();
}

function goBack() {
    window.location.href = '../content/p2.html';
}
// конец ---- Игра3----