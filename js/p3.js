var long;
var div = document.getElementById('txt');
var mas1 = ['машин', 'язык', 'груши', 'плавать'];
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

function text1() {
    div.innerHTML = "Леопард является видом хищных машин млекопитающих семейства кошачьих. В древние времена существовало мнение язык о том, что леопард не что иное как гибрид груши пантеры и льва. Именно это предположение вылилось в название животного, соединив в себе два греческих слова: «леон» ( что в переводе означает «лев» ) и «пардос» ( что в переводе означает плавать пантера ).";
    wrapWords()
}

function check() {
    var e = (document.getElementsByClassName("highlight"));
    for (var i = 0; i < e.length; i++) {
        // console.log(i);
        for (var k = 0; k < mas1.length; k++) {
            // console.log(k);
            // console.log(e[i].innerText);
            if ((mas1[k]) == e[i].innerText) {
                e[i].style.backgroundColor = "green";
                countTrue++;
                break;
            } else {
                e[i].style.backgroundColor = "crimson";
            }
        }
    }
    if (countTrue == mas1.length) {
        var t = Number(localStorage.getItem(localStorage.key(0))) + Number(5);
        localStorage.setItem(localStorage.key(0), t);
        window.location.href = '../content/finalPage.html';
    }
    if (countTrue != mas1.length) {
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
        setTimeout(reloadPag, 4000);
    }
}

function reloadPag() {
    window.location.reload();
}

function goBack() {
    window.location.href = '../content/p2.html';
}
// конец ---- Игра3----