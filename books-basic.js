// array which contains the initial books
var books = [{
        title: 'The Design of EveryDay Things',
        author: 'Don Norman',
        alreadyRead: false
    },
    {
        title: 'The Most Human Human',
        author: 'Brian Christian',
        alreadyRead: true
    },
    {
        title: 'Moara cu noroc',
        author: 'Ioan Slavici',
        alreadyRead: true
    }
];
   // get the values from the title and author inputs
   var bookTitle = document.getElementsByName('title')[0];
   var bookAuthor = document.getElementsByName('author')[0];

// get the element with 'myBooks' id
var myBooks = document.getElementById('myBooksContainer');

// create a list element
var bookList = document.createElement('ul');

// append the created element to the myBooks element
myBooks.appendChild(bookList);

// call the displayBook() function for every book in the books array
for (var i = 0; i < books.length; i++) {
    displayBook(books[i]);
}

// get the buttom with the 'addNewBook' id
var button = document.getElementById('addNewBook');

// add a click event listener to this button
button.addEventListener('click', function () {

    // create an new book object with the values that we get from the inputs
    // validate that the title and author fields have values before adding a new book
    // display errors, which indicates which field is not completed
    let formValid = true;
    if(!bookTitle.value) {
        formValid=false;
        bookTitle.classList.add("invalidInput");
        let invalidText = document.getElementById("invalidTextTile");
        invalidText.style.visibility ="visible";
        invalidText.innerHTML = "Title of the book is invalid. Please write a title!"
    } else {
        console.log (bookTitle.value + "is valid");
    } if (!bookAuthor.value) {
        formValid=false;
        bookAuthor.classList.add("invalidInput");
        let invalidText = document.getElementById("invalidTextAuthor");
        invalidText.style.visibility ="visible";
        invalidText.innerHTML = "Please mention the author of the book";
    } else {
        console.log (bookAuthor.value + "is valid");

    // validate duplicate items, if the book already exist in the list display an error
    }
    for (i=0; i<books.length; i++) {
        if(books[i].title===bookTitle.value && books[i].author===bookAuthor.value) {
            formValid=false;
            let errorDuplicate = document.getElementById("errorDuplicate");
            errorDuplicate.style.visibility= "visible";
            errorDuplicate.innerHTML = "This book was already added on the list!"
        }
    }
    if(formValid) { 
    var newBook = {
        title: bookTitle.value,
        author: bookAuthor.value,
        alreadyRead: false
    };
    // call the displayBook() function with the newBook object as argument
    displayBook(newBook);
}
});

// remove the errors, after the input has value (hint: use "keypress" event listener on inputs)

bookTitle.addEventListener("input", function() { validateInput("title", "invalidTextTile");});
bookAuthor.addEventListener("input", function() { validateInput("author", "invalidTextAuthor");});


function validateInput(inputId, errorTextID) {
    const element = document.getElementById(inputId);
    const errorText = document.getElementById(errorTextID);
    if (element.value) {
        element.classList.remove("invalidInput");
        errorText.style.visibility = "hidden";
    } else {
        element.classList.add("invalidInput");
        errorText.style.visibility = "visible";
    }
}


function displayBook(currentBook) {
    // create a list item element
    var listItem = document.createElement('li');

    // create an input
    var checkbox = document.createElement('input');
    // set the input type attribute to checkbox
    checkbox.setAttribute('type', 'checkbox');
    // set the checked attribute based on the books alreadyRead property 
    checkbox.checked = currentBook.alreadyRead;
    // append the checkbos to the list item
    listItem.appendChild(checkbox);

    // get the book details from the title and author properites concatenated with the 'by' string
    var bookDetails = currentBook.title + ' by ' + currentBook.author;
    // create a text node which contains the bookDetails string
    var bookDetailsTextNode = document.createTextNode(bookDetails);
    // append the bookDetailsTextNode to the list item
    listItem.appendChild(bookDetailsTextNode);

    // append the list item to the bookList (global variable)
    bookList.appendChild(listItem);

    // reset the form after adding an item
    document.getElementById("myForm").reset();
}