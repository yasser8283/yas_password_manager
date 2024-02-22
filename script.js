
document.addEventListener('DOMContentLoaded', function () {
    loadentries();
});


let entryform = document.getElementById('entryform');
entryform.addEventListener('submit', function (event) {
    event.preventDefault();

    let website = document.getElementById('website').value;
    let username = document.getElementById('user').value;
    let password = document.getElementById('password').value;
    if (website.trim() === '' || username.trim() === '' || password.trim() === '') {
        event.preventDefault(); // Prevent form submission
        alert('Please fill out all fields.');
        
    }
    else{
        let entrytable = document.getElementById('entrytable');
    let row = entrytable.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = '<a href="' + website + '" target="_blank">' + website + '</a>';
    cell2.textContent = username;
    cell3.textContent = password;

    let cell4 = row.insertCell(3);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', function () {

        deleteEntry(row.rowIndex);
    });
    cell4.appendChild(deleteButton);

    let cell5 = row.insertCell(4);
    let copyButton = document.createElement('button');
    copyButton.textContent = 'Copy the username';
    copyButton.classList.add('copy_username');
    copyButton.addEventListener('click', function () {
        copy_username(username);
    });
    cell5.appendChild(copyButton);

    document.getElementById('website').value = '';
    document.getElementById('user').value = '';
    document.getElementById('password').value = '';
    let cell6 = row.insertCell(5);
    let copy_pwd = document.createElement('button');
    copy_pwd.textContent = 'Copy the password';
    copy_pwd.classList.add('copy_password');
    copy_pwd.addEventListener('click', function () {
        copy_password(entry.password);
    });
    cell6.appendChild(copy_pwd);
    saveEntry(website, username, password);
    hidePassword();
    }
});




function saveEntry(website, username, password) {

    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    entries.push({ website: website, username: username, password: password });

    localStorage.setItem('entries', JSON.stringify(entries));
}


function loadentries() {

    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    let entrytable = document.getElementById('entrytable');
    entries.forEach(function (entry) {
        let row = entrytable.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = '<a href="' + entry.website + '" target="_blank">' + entry.website + '</a>';
        cell2.textContent = entry.username;
        cell3.textContent = entry.password;

        let cell4 = row.insertCell(3);
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('deleteButton');
        deleteButton.addEventListener('click', function () {

            deleteEntry(row.rowIndex);
        });
        cell4.appendChild(deleteButton);

        let cell5 = row.insertCell(4);
        let copyButton = document.createElement('button');
        copyButton.textContent = 'Copy the username';
        copyButton.classList.add('copy_username');
        copyButton.addEventListener('click', function () {

            copy_username(entry.username);
        });
        cell5.appendChild(copyButton);

        let cell6 = row.insertCell(5);
        let copy_pwd = document.createElement('button');
        copy_pwd.textContent = 'Copy the password';
        copy_pwd.classList.add('copy_password');
        copy_pwd.addEventListener('click', function () {
            copy_password(entry.password);
        });
        cell6.appendChild(copy_pwd);
    });
    hidePassword();
}

function deleteEntry(rowIndex) {
    let entrytable = document.getElementById('entrytable');
    entrytable.deleteRow(rowIndex);
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(rowIndex - 1, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
}

function copy_username(username) {
    navigator.clipboard.writeText(username)
        .then(() => {
            alert("Username copied!!");
        })
        .catch(err => {
            console.log("Error copying", err);
        });
}
function copy_password(password) {
    navigator.clipboard.writeText(password)
        .then(() => {
            alert("Password copied!!");
        })
        .catch(err => {
            console.log("Error copying", err);
        });
}
function hidePassword() {
    let passwordCells = document.querySelectorAll('#entrytable td:nth-child(3)');
    passwordCells.forEach(function (cell) {
        cell.textContent = '*******';
    });
}
