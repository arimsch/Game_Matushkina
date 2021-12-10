function makeT() {
    var picHolder = document.getElementById("block-img");
    var newRow = picHolder.insertRow(0);
    var newCell = newRow.insertCell(0);
    newCell.setAttribute('class', 'add');
    newCell.innerHTML = "строка 1 столбец 1";

    newCell = newRow.insertCell(1);
    newCell.setAttribute('class', 'add');
    newCell.innerHTML = "строка 1 столбец 2";
}