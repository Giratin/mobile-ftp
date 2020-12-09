let loggedIn = false;

function init() {
    const token = localStorage.getItem('XMAI');
    if (token != null) {
        loggedIn = true;
    } else {
        loggedIn = false;
    }
}

$(document).ready(function () {
    if (loggedIn) {
        const loc = location.href;
        if (loc.indexOf('login') !== -1) {
            location.href = "/";
        }
        document.querySelector('#login').href = "javascript:logout()";
        document.querySelector('#login').innerText = "Logout";
        document.querySelector('#login').classList.remove('btn-outline-info');
        document.querySelector('#login').classList.add('btn-outline-danger');
    }
})

function logout() {
    localStorage.removeItem('XMAI');
    loggedIn = false;
    document.querySelector('#login').href = "/login";
    document.querySelector('#login').innerText = "Login";
    document.querySelector('#login').classList.add('btn-outline-info');
    document.querySelector('#login').classList.remove('btn-outline-danger');
}



function login() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    if (email != "" && password != "") {
        $.post('/users/login', { email, password }, function (data) {
            if (data.token) {

                localStorage.setItem("XMAI", data.token);
                location.href = "/dashboard"
            } else {
                $('#message').html(
                    `<div class="alert alert-danger alert-sm">
                    ${data}
                </div>`);
            }
        }, 'json')
    } else {
        $('#message').html(
            `<div class="alert alert-danger alert-sm">
            All fields are required
        </div> `);
        document.querySelector('#btnLogin').disabled = false;
    }
}

function emailTyping() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    $('#message').html(``);
    if (email == "") {
        $('#emptyEmail').html(
            `<div class="alert alert-danger alert-sm">
                Email is required
            </div>`
        );
        document.querySelector('#btnLogin').disabled = true;
    } else {
        $('#emptyEmail').html(``);
        if (password != "" && email != "") {
            document.querySelector('#btnLogin').disabled = false;
        }
    }
}

function passwordTyping() {
    const password = document.querySelector('#password').value;
    const email = document.querySelector('#email').value;
    $('#message').html(``);
    if (password == "") {
        $('#emptyPassword').html(
            `<div class="alert alert-danger alert-sm">
                Password is required
            </div> `
        );
        document.querySelector('#btnLogin').disabled = true;
    } else {
        $('#emptyPassword').html(``);
        if (password != "" && email != "") {
            document.querySelector('#btnLogin').disabled = false;
        }
    }
}

function displayForm() {
    if($('#createForm').css('display') == "block"){
        $('#btnCreate').html('Create New File');
        $('#createForm').css('display', 'none');
    }else{
        $('#btnCreate').html('Hide Create Form');
        $('#createForm').css('display', 'block');
    } 
}

function uploadFile() {
    console.log("uploading file")

    const title = $('#Title').val();
    if (title == "" || title == undefined) {
        $('#emptyTitle').html(`<div class="alert alert-danger mt-1">Title is required</div>`)
    } else {
        $('#emptyTitle').html(``);
    }

    const fileInput = $("#file");
    console.log(fileInput)
    if (fileInput[0].files.length == 0 || fileInput == undefined) {
        $('#emptyFile').html(`<div class="alert alert-danger mt-1">Please Choose a File</div>`)
    } else {
        $('#emptyFile').html(``)
        if (title) {
            $('#btnUpload').disabled = true;

            var formData = new FormData();
            formData.append('file', fileInput[0].files[0]);
            formData.append("Title", title);

            $.ajax({
                url: '/users/uploadFile',
                contentType: false,
                processData: false,
                method: 'POST',
                data: formData,
                success : function(data){
                    console.log(data)
                    $('#btnUpload').disabled = false;
                    displayForm();
                    $('#alert').html(`<div class="alert alert-success"> File uploaded successfully </div>`)
                },
                error : function(er){
                    $('#btnUpload').disabled = false;
                    $('#message').html(`<div class="alert alert-danger">An error has occured</div>`)
                }
            })

        }
    }

}

function deleteFile(id){
    if(confirm("Are You sure you want to delete this file?")){
        alert("Deleting")
    }else{
        alert("Canceled")
    }
}

function fileChange(event) {
    let fileName = event.target.files[0].name;
    $('#choosedFile').html(fileName);
    $('#emptyFile').html(``)
}

function download(id){
    console.log("downloading")
    $.get(`/users/download/${id}`,function(data){
        console.log(data)
    })
}