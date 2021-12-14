var long;
var div = document.getElementById('txt');
var mas1 = ['машин', 'язык', 'груши', 'плавать'];

// НАЧАЛО ---- Игра3----
function wrapWords() {
    swal("Уровень 3!");
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
    var e = (document.getElementsByClassName("highlight"));
});

div.addEventListener('dblclick', function(event) {
    var target = event.target;
    if (target.innerHTML.length != long) {
        target.removeAttribute("class");
    }
});

function text1() {
    div.innerHTML = "Леопард является видом хищных машин млекопитающих семейства кошачьих. В древние времена существовало мнение язык о том, что леопард не что иное как гибрид груши пантеры и льва. Именно это предположение вылилось в название животного, соединив в себе два греческих слова: «леон» (что в переводе означает «лев») и «пардос» (что в переводе означает пантера плавать).";
    wrapWords()
}

function goBack() {
    window.location.href = '../content/p2.html';
}
// конец ---- Игра3----