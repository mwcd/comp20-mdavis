var text;

function parse () {
    myRequest = new XMLHttpRequest();
    myRequest.open("get", "http://messagehub.herokuapp.com/messages.json", "true");
    myRequest.send();
    myRequest.onreadystatechange = function() {
        console.log(myRequest.readyState);
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            text = JSON.parse(myRequest.responseText);
            for(var i = 0; i < 2; i++) {
                document.getElementById('messages').innerHTML += "<p>" + text[i].content + " " + text[i].username + "</p>";
            }
        }
    }
}