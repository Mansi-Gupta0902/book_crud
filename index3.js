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
Display.prototype.add = function () {
    let books = localStorage.getItem('books');
    if (books == null) {
        bookArr = [];
    }
    else {
        bookArr = JSON.parse(books);
    }
    let html="";
    bookArr.forEach(function (element, index) {
        tableBody = document.getElementById('tableBody');
         html += `
                  <tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id="${index}" onclick="deleteBook(this.id)" class="btn btn-dark btn-sm">Delete</button></td>
                  </tr>`;
       
    });

    tableBody.innerHTML = html;

}
let dis=new Display();
dis.add();

Display.prototype.clear = function () {
    document.getElementById('bookName').value = "";
    document.getElementById('author').value = "";
    document.getElementById('fiction').checked = true;

}
Display.prototype.validate = function (bookObj) {
    if (bookObj.name.length < 2 || bookObj.author.length < 2) {
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



    let books = localStorage.getItem('books');
    if (books == null) {
        bookArr = [];
    }
    else {
        bookArr = JSON.parse(books);
    }
    let bookObj = new book(name, author, type);
    console.log(bookObj);


    let display = new Display();

    if (display.validate(bookObj)) {
        bookArr.push(bookObj);
        localStorage.setItem("books", JSON.stringify(bookArr));

        display.add();
        display.clear();
        display.show('success', 'Your book has been succesfully added');
    }
    else {
        display.show('danger', 'You cannot add this book');
    }


}
function deleteBook(index)
{
    let books = localStorage.getItem('books');
    if (books == null) {
        bookArr = [];
    }
    else {
        bookArr = JSON.parse(books);
    }
    bookArr.splice(index,1);
    localStorage.setItem("books",JSON.stringify(bookArr));
    let dis=new Display();
    dis.add();
}
