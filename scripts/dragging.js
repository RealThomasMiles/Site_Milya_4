var offset_data;
var draggable;
var draggableStyle;
var animalPos = new Map();
var animals = document.querySelectorAll('.dragging-object');
animals.forEach(animal => {
    let animalStyle = window.getComputedStyle(animal, null);
    const currRotation = animalStyle.getPropertyValue("transform");
    const values = currRotation.split('(')[1].split(')')[0].split(',');
    const angle = Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
    animalPos.set(animal.id, {left: parseInt(animalStyle.getPropertyValue("left"),10), top: parseInt(animalStyle.getPropertyValue("top"),10), rotation: angle});
})

function handleClick(e) {
    const elem = e.target;
    const elemPos = animalPos.get(elem.id);
    elemPos.rotation = (elemPos.rotation + 90) % 360;
    animalPos.set(elem.id, elemPos);
    elem.style.transform = 'rotate('+elemPos.rotation+'deg)';
    if (checkPos()) {
        startAnimation();
    }
}

function dragStart(e) {
    draggableStyle = window.getComputedStyle(e.target, null);
    offset_data = (parseInt(draggableStyle.getPropertyValue("left"),10) - e.clientX) + ',' + (parseInt(draggableStyle.getPropertyValue("top"),10) - e.clientY);
    requestAnimationFrame(() => {
        e.target.style.visibility = 'hidden';
    })
    draggable = e.target;
}

function dragEnter(e) {
    e.preventDefault();
    return true;
}

function dragDrop(e) {
    var offset = offset_data.split(',');
    var offsetX = parseInt(offset[0],10);
    var offsetY = parseInt(offset[1],10);
    var elem = draggable;
    if (checkDrop(e.clientX, e.clientY, offsetX, offsetY)) {
        elem.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
        elem.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
        animalPos.set(elem.id, {left: parseInt(elem.style.left, 10), top: parseInt(elem.style.top, 10), rotation: animalPos.get(elem.id).rotation});
    }
    requestAnimationFrame(() => {
        elem.style.visibility = 'visible';
    })
    if (checkPos()) {
        startAnimation();
    }
    e.preventDefault();
    return false;
}

function dragOver(e) {
    e.preventDefault();
    return false;
}

function dragLeave(e) {
    e.preventDefault();
    return false;
}

function dragEnd(e) {
    e.preventDefault();
    requestAnimationFrame(() => {
        draggable.style.visibility = 'visible';
    })
    return false;
}

function checkDrop(clientX, clientY, offsetX, offsetY) {
    const dragArea = document.getElementById('dragging-area-1');
    const dragAreaStyle = window.getComputedStyle(dragArea, null);
    if ((clientX + offsetX >= 0) && (clientX + offsetX + parseInt(draggableStyle.getPropertyValue("width"), 10) <= parseInt(dragAreaStyle.getPropertyValue("width"), 10))) {
        if ((clientY + offsetY >= 0) && (clientY + offsetY + parseInt(draggableStyle.getPropertyValue("height"), 10) <= parseInt(dragAreaStyle.getPropertyValue("height"), 10))) {
            return true;
        }
    }
    return false;
}

function checkPos() {
    for (const currAnimal of animalPos) {
        if (currAnimal[1].rotation !== 0) {
            return false;
        }
    }
    const carnivoreList = document.querySelectorAll('.carnivore');
    const carnivorePivot = animalPos.get(carnivoreList[0].id);
    for (let i = 1; i < carnivoreList.length; i++) {
        let currentPos = animalPos.get(carnivoreList[i].id);
        if (Math.abs(carnivorePivot.left - currentPos.left) > 150 || Math.abs(carnivorePivot.top - currentPos.top) > 150) {
            return false;
        }
    }
    const herbivoreList = document.querySelectorAll('.herbivore');
    const herbivorePivot = animalPos.get(herbivoreList[0].id);
    for (let i = 1; i < herbivoreList.length; i++) {
        let currentPos = animalPos.get(herbivoreList[i].id);
        if (Math.abs(herbivorePivot.left - currentPos.left) > 150 || Math.abs(herbivorePivot.top - currentPos.top) > 150) {
            return false;
        }
    }
    return !(Math.abs(carnivorePivot.left - herbivorePivot.left) < 350 && Math.abs(carnivorePivot.top - herbivorePivot.top) < 350);

}

function startAnimation() {
    animals.forEach(animal => {
        animal.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 1000,
            iterations: 1
        });
    })
}
