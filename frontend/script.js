var chatboxContent = document.getElementById('chatboxContent');
var userInput = document.getElementById('userInput');
var socket = io('https://chatbot-backend-mxgn.onrender.com'); // Added the backend URL here

// Handle connection
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// Listen for messages from the server
socket.on('message', function(data) {
    var message = document.createElement('p');
    message.textContent = data;
    message.classList.add('bot-message');
    chatboxContent.appendChild(message);

    scrollToBottom();
});

// Send user message to server
function sendMessage(message) {
    if (message.trim() === "") return; // Prevent empty messages

    socket.emit('user_message', message);

    var userMessage = document.createElement('p');
    userMessage.textContent = 'You: ' + message;
    userMessage.classList.add('user-message');
    chatboxContent.appendChild(userMessage);

    userInput.value = ""; // Clear input field

    scrollToBottom();
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage(userInput.value);
    }
}

// Handle send button click
function sendMessageFromButton() {
    sendMessage(userInput.value);
}

// Function to scroll to the latest message smoothly
function scrollToBottom() {
    setTimeout(() => {
        chatboxContent.lastChild?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
}

// Observe new messages and ensure auto-scrolling
const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            scrollToBottom();
        }
    }
});

observer.observe(chatboxContent, { childList: true });