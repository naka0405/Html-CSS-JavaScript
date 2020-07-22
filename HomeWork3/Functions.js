function RemoveDisabled(str, newStr) {
    let button = document.querySelector(str);
    button.removeAttribute('disabled');
    if (newStr) {
        button.className = newStr;
    }
}

function SetDisabled(str, newStr) {
    let b_clearAll = document.querySelector(str);
    b_clearAll.className = newStr;
}

function CreateElement(elem, className, innerText, attr, value) {
    let element = document.createElement(elem);
    element.className = className;
    element.innerText = innerText;
    element.setAttribute(attr, value);
    return element;
}