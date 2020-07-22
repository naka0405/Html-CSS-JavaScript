var items;
var getAllButton;

window.onload = function () {
    items = [{ name: 'i1', id: 0 }, { name: 'i2', id: 1 }, { name: 'i3', id: 2 }, { name: 'i4', id: 3 }, { name: 'i5', id: 4 }];
    //items = [1, 2, 3, 4, 5];
    getAllButton = document.querySelector('.B_getAll');
    getAllButton.addEventListener('click', GetAll, false);
}

function GetAll() {
    getAllButton.setAttribute("disabled", "true");

    let contentBody = document.querySelector('.datas');

    for (let i = 0; i < items.length; i++) {
        if (items[i]) {
            let newItem = CreateElement('div', 'item', items[i].name, 'id', items[i].id);
            contentBody.appendChild(newItem);
            newItem.innerHTML += "<button class='B_Delete'>Delete</button>";
            newItem.innerHTML += "<button class='B_Edit'>Edit</button>";
        }
    }
    let addButton = document.querySelector('.B_addItem');
    if (!addButton) {
        contentBody.insertAdjacentHTML('afterend', "<p><button class='B_addItem'>Add item</button></p>");
        addButton = document.querySelector('.B_addItem');
        addButton.addEventListener('click', AddItem, false);
    }

    RemoveDisabled('.B_clearAll_disabled', 'B_clearAll');
    let b_clearAll = document.querySelector('.B_clearAll');
    let buttonsEdit = document.querySelectorAll('.B_Edit');

    b_clearAll.addEventListener('click', ClearAll, false);

    let buttonsDelete = document.querySelectorAll('.B_Delete');
    for (let i = 0; i < buttonsDelete.length && i < buttonsEdit.length; i++) {
        let butDel = buttonsDelete[i];
        let butEdit = buttonsEdit[i];
        butDel.addEventListener('click', DeleteItem, false);
        butEdit.addEventListener('click', EditItem, false);
    }
}

function AddItem() {
    let num = items.length;
    let newItem = CreateElement('div', 'item', '', 'id', num);
    let contentBody = document.querySelector('.datas');
    contentBody.appendChild(newItem);
    let inputbox = CreateElement('input', 'editable', '', 'type', 'text');
    newItem.appendChild(inputbox);
    newItem.innerHTML += "<button class='B_Delete'>Delete</button>";
    newItem.innerHTML += "<button class='B_Save'>Save</button>";
    newItem.childNodes[1].addEventListener('click', DeleteItem, false);
    newItem.childNodes[2].addEventListener('click', SaveNewItem, false);
}

function DeleteItem(event) {

    let deleteButton = event.currentTarget;
    let div = deleteButton.parentNode;
    let id = div.id;
    delete items[id];
    div.remove();
    let datas = document.querySelector('.datas').childNodes;
    if (datas.length <= 1) {
        SetDisabled('.B_clearAll', '.B_clearAll_disabled');
        RemoveDisabled('.B_getAll');
    }
}

function ClearAll(event) {
    let content = document.querySelector('.datas').childNodes;
    while (content[0]) {
        content[0].remove();
    }
    items = [];//if delete this row, array will be save. Its items will be seen in App, by button GetAll.

    let b_clearAll = event.target;
    b_clearAll.setAttribute('disabled', 'true');
    b_clearAll.className = "B_clearAll_disabled";
    RemoveDisabled('.B_getAll');
}

function EditItem(event) {

    let editButton = event.target;

    let div = editButton.parentNode;

    let oldNode = div.childNodes[0];

    let newNode = CreateElement('input', 'editable', '', 'type', 'text');

    let butSave = CreateElement('button', 'B_Save', 'Save');

    div.replaceChild(newNode, oldNode);
    div.replaceChild(butSave, editButton);

    let saveButton = div.lastChild;
    saveButton.addEventListener('click', SaveNewItem, false);
}

function SaveNewItem() {
    let div = this.parentNode;
    let newValue = div.firstChild.value;
    div.value = newValue;

    let text = div.firstChild;
    text.setAttribute('disabled', true);
    text.className = "itemText";

    let id = div.id;
    items[id] = newValue;

    let butEdit = CreateElement('button', 'B_Edit', 'Edit');
    let butSave = div.lastChild;
    div.replaceChild(butEdit, butSave);
    butEdit.addEventListener('click', EditItem, false);
}