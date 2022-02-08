console.log("library project");
function book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;

}
//Display constructor
function Display() {

}
//Add methods to display prototype
Display.prototype.add = function (bookObj) {
    tableBody = document.getElementById('tableBody');
    let html = `
                  <tr>
                    <td>${bookObj.name}</td>
                    <td>${bookObj.author}</td>
                    <td>${bookObj.type}</td>
                  </tr>`;
    tableBody.innerHTML += html;

}
Display.prototype.clear = function () {
    document.getElementById('bookName').value = "";
    document.getElementById('author').value = "";
    document.getElementById('fiction').checked = true;

}
Display.prototype.validate = function (bookObj) {
    if (bookObj.name.length < 2 || bookObj.author.length<2 ) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (string, showMsg) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${string} alert-dismissible fade show" role="alert">
                            <strong>Message: </strong>${showMsg}.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;

    setTimeout(() => {
        message.innerHTML = "";
    }, 2000);
}
let addBook = document.getElementById('addBook');
addBook.addEventListener("click", librarySubmit);
function librarySubmit() {
    console.log("Added book");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;

    let fiction = document.getElementById('fiction');
    let educational = document.getElementById('educational');
    let homeScience = document.getElementById('homeScience');

    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (educational.checked) {
        type = educational.value;
    }
    else {
        type = homeScience.value;
    }

    let bookObj = new book(name, author, type);
    console.log(bookObj);

    let display = new Display();

    if(display.validate(bookObj)) {
        display.add(bookObj);
        display.clear();
        display.show('success', 'Your book has been succesfully added');
    }
    else {
        display.show('danger', 'You cannot add this book');
    }


}

