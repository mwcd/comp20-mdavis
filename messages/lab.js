var text;

function parse () {
    myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", getData)
    myRequest.open("get", "http://messagehub.herokuapp.com/messages.json", "true");
    myRequest.send();
}

function getData () {
    text = JSON.parse(myRequest.responseText);
    console.log(text);
    for(var i = 0; i < 2; i++) {
        document.getElementById('messages').innerHTML += "<p>" + text[i].content + " " + text[i].username + "</p>";
    }
}