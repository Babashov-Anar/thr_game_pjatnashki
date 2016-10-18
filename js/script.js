var StartGame = document.querySelector(".start"),
    cells = document.getElementsByClassName('cell'),
    items = document.getElementsByClassName('square'),
    wrap = document.body.childNodes[1];
    itemsArr = [],
    cellsArr = [],
    popUp = document.querySelector(".pop-up"),
    wrapWindow = document.querySelector(".overlay");

function objectToArray(obj, arr) {
    for (var data in obj) {
        if (!obj.hasOwnProperty(data)) continue
        arr.push(obj[data]);
    }
}

function shuffle(arr) {
    arr.sort(function() {
        return Math.random() - 0.5;
    })
    for (var i = 0; i < itemsArr.length; i++) {
        cellsArr[i].appendChild(itemsArr[i]);
    }
}

StartGame.addEventListener("click", function(event) {
    event.preventDefault();
    shuffle(itemsArr);
});

objectToArray(cells, cellsArr);
objectToArray(items, itemsArr);
var test = [-1, 1, -4, 4];

function getIndex(elem, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (elem == arr[i]) {
            return i;
        }
    }
    return;
}

function check(arrCells) {
    var flag = true;
    for (var i = 1; i < arrCells.length; i++) {
        if (!arrCells[i].children[0]) continue;
        if (i + 1 != arrCells[i].children[0].textContent) {
            flag = false;
            break;
        }
    }
    if (flag) {
        popUp.classList.add("pop-up-show");
        popUp.classList.add("slide-effect-on")
        wrapWindow.classList.add("overlay-show");
    }
}

wrap.addEventListener("click", function(event) {
    event.preventDefault();
    var target = event.target;
    if (target.classList.contains("square")) {
        var cell = target.parentNode;
        var ind = getIndex(cell, cellsArr);
        if (!((ind + 1) % 4)) {
            test = [-1, 4, -4];
        } else if (!((ind) % 4)) {
            test = [1, 4, -4];
        } else {
            test = [-1, 1, -4, 4];
        }
        var start = 0;
        var end = 15;
        for (var i = 0; i < test.length; i++) {
            var newCoord = ind + test[i];
            if (newCoord >= start && newCoord <= end) {
                if (!cellsArr[newCoord].children[0]) {
                    console.log(cellsArr[newCoord].children[0]);
                    cellsArr[newCoord].appendChild(cellsArr[ind].children[
                        0]);
                    check(cellsArr);
                }
            }
        }
    }
});