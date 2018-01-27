document.getElementById("myForm").addEventListener('submit', saveBook)

function saveBook(e) {
    var siteName = document.getElementById("siteName").value;
    var siteURL = document.getElementById("siteURL").value;
    if (!validateForm(siteName,siteURL)) {
        return false


    }
    var bookmark = {
        name: siteName,
        url: siteURL
    }
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];

        bookmarks.push(bookmark)
        console.log(bookmarks)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }
    e.preventDefault();
    document.getElementById('myForm').reset();
    fetchbookmarks()
}

function deletebookmark(url) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    for (var i = 0; i < bookmarks.length; i++) {
        if (url === bookmarks[i].url) {
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchbookmarks()


}

function validateForm(sitename, siteurl) {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteurl.match(regex)) {
        alert("Enter correct URL!")
        return false;
    }
    if (!sitename || !siteurl) {
        alert("Please fill up the form!")
        return false
    }
    return true
}


function fetchbookmarks() {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var addedSites = document.getElementById("addedSites");
    addedSites.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url
        addedSites.innerHTML += '<div class="test">' +
            '<h3>' + name + '</h3>' +
            '<a class="btn btn-primary" target="_blank" href="' + url + '">VISIT</a>' +
            '<a onclick="deletebookmark(\'' + url + '\')" class="btn btn-danger" href="#">DELETE</a> ' +
            '</div>'


    }


}