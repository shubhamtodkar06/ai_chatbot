var chatbox = document.getElementById('chatbox');
var userInput = document.getElementById('userInput');
var socket = io(); // Connect to the server

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('message', function(data) {
    var message = document.createElement('p');
    message.textContent = data;
    chatbox.appendChild(message);
});

function sendMessage(message) {
    socket.emit('user_message', message);
    var userMessage = document.createElement('p');
    userMessage.textContent = 'You: ' + message;
    chatbox.appendChild(userMessage);
    userInput.value = ""; // Clear input after sending
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage(userInput.value);
    }
}