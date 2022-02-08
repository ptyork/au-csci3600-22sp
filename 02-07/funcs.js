function print(text) {
    console.log(text);
}

function printSelector(selector, text) {
    elem = document.querySelector(selector);
    elem.innerHTML = text;
}

function appendSelector(selector, text) {
    elem = document.querySelector(selector);
    // elem.innerHTML = elem.innerHTML + text;
    elem.innerHTML += '<br>' + text;
}