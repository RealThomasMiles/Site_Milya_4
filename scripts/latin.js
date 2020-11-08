var latinExpressions = [`"Consuetudo est altera natura"`, `"Nota bene"`, `"Nulla calamitas sola"`, `"Per aspera ad astra"`, `"Respice post te! Hominem te memento! Memento mori"`, `"In vino veritas, in aqua sanitas"`, `"Aut inveniam viam aut faciam"`, `"Feci quod potui faciant meliora potentes"`]
var russianTranslations = [`"Привычка - вторая натура"`, `"Заметьте хорошо!"`, `"Беда не приходит одна"`, `"Через тернии к звёздам"`, `"Обернись! Помни, что ты – человек! Помни о смерти"`, `"В вине - истина, в воде - здоровье"`, `"Или найду дорогу, или проложу её сам"`, `"Я сделал всё, что мог, пусть те, кто могут, сделают лучше"`]
var list = document.getElementById("asideList");
var counter = 0;
shuffle();

function getExpression() {
    if (counter == latinExpressions.length) {
        alert("Out of phrases");
    } else {
        var li = document.createElement('li');
        li.innerHTML = latinExpressions[counter];
        var subLi = document.createElement('li');
        subLi.innerHTML = russianTranslations[counter];
        var subUl = document.createElement('ul');
        subUl.appendChild(subLi);
        li.appendChild(subUl);
        (counter % 2 == 0) ? li.className = 'class1' : li.className = 'class2';
        list.appendChild(li);
        counter++;
    }
}

function recolor() {
    var elements = document.querySelectorAll('ol > li:nth-of-type(2n)');    
    elements.forEach(element => {
        element.style.fontWeight = 'bold';
    })
}

function shuffle() {
    for (var i = latinExpressions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [latinExpressions[i], latinExpressions[j]] = [latinExpressions[j], latinExpressions[i]];
      [russianTranslations[i], russianTranslations[j]] = [russianTranslations[j], russianTranslations[i]];
    }
}