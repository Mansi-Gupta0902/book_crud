// let disf=new Display();
// disf.add();
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
    let bookInfo=localStorage.getItem("bookInfo");
    if(bookInfo==null)
    {
        bookObj=[];
    }
    else
    {
        bookObj=JSON.parse(bookInfo);
    }
    
    bookObj.forEach(function(element,index) {
        tableBody = document.getElementById('tableBody');
     let html = `
                  <tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button type="button" id="${index}" onclick="deleteBook(this.id)" class="btn btn-dark btn-sm">Delete</button></td>
                  </tr>`;
    tableBody.innerHTML += html;

        
    });
    
}
Display.prototype.clear = function () {
    document.getElementById('bookName').value = "";
    document.getElementById('author').value = "";
    document.getElementById('fiction').checked = true;

}
Display.prototype.validate = function (myObj) {
    if (myObj.name.length < 2 || myObj.author.length<2 ) {
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
let disf=new Display();
disf.add();
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

    
    
    let bookInfo=localStorage.getItem("bookInfo");
    // console.log(bookInfo);
    if(bookInfo==null)
    {
        bookObj=[];
    }
    else{
        bookObj=JSON.parse(bookInfo);
    }
    let myObj = new book(name, author, type);
    // console.log(myObj,typeof bookObj);
    let display = new Display();
    if(display.validate(myObj))
    {
        bookObj.push(myObj);
    }
    else
    {
        display.show('danger', 'You cannot add this book');
    }
    
    localStorage.setItem("bookInfo",JSON.stringify(bookObj));

    // let display = new Display();
    

    if(display.validate(myObj)) {
        display.add();
        display.clear();
        display.show('success', 'Your book has been succesfully added');
    }
    else {
        display.show('danger', 'You cannot add this book');
    }
    setTimeout(() => {
        document.location.reload();
    }, 2000);

    
}
function deleteBook(index)
{
    let bookInfo=localStorage.getItem("bookInfo");
    // console.log(bookInfo);
    if(bookInfo==null)
    {
        bookObj=[];
    }
    else{
        bookObj=JSON.parse(bookInfo);
    }
    bookObj.splice(index,1);
    localStorage.setItem("bookInfo",JSON.stringify(bookObj));
    // let display=new Display();
    
    // display.add();
    document.location.reload();
}

