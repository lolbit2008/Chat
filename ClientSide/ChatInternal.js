import {scrollDown} from './Chat.js'; 
const ChatTextTemplate = document.querySelector('#ChatTextTemplate').content;
const chatBox = document.querySelector('#chatBoxDiv');

const API_URL = "https://chat-1b0a.onrender.com";

let currentUserId = null; 

function waitForUserId() {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (currentUserId) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
}

async function initializeChat() {
    const savedData = localStorage.getItem('Userdata');
    if (savedData) {
        const userData = JSON.parse(savedData);
        if (userData.UserId) {
            currentUserId = userData.UserId;
        }
    }

    if (!currentUserId) {
        await GetId(); 
    }

    GetMessages();
}

initializeChat();

function GetMessages() {
    fetch(`${API_URL}/api/messages`)
    .then(Response => Response.json())
    .then(data => {
        chatBox.innerHTML = ''; 
        loadMessages(data);
    })
    .catch(error => console.error("Error loading messages:", error));
}

function loadMessages(jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        inputChat(jsonData[i].Message, jsonData[i].User);
    }
}

function inputChat(value, user) {
    let chatText = ChatTextTemplate.cloneNode(true);
    let chatTextEl = chatText.querySelector('.chatText');
    chatTextEl.textContent = `${value} - ${user}`; 
    chatBox.appendChild(chatText); 
}

async function ParseJson(value, User) { 
    if (!currentUserId) {
        console.log("User ID not available yet, waiting...");
        await waitForUserId();
    }

    inputChat(value, User);

    let jsonData = {
        "User": User,
        "userID": currentUserId,
        "Message": value
    }

    fetch(`${API_URL}/api/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Message saved successfully:', data);
        scrollDown();
    })
    .catch(error => console.error('Error saving message:', error));
}

async function GetId() {
    try {
        const response = await fetch(`${API_URL}/api/get-user-id`);
        const data = await response.json();
        currentUserId = data.id; 
        console.log('Received User ID:', currentUserId);

        const savedData = localStorage.getItem('Userdata');
        if (savedData) {
            const userData = JSON.parse(savedData);
            userData.UserId = currentUserId;
            localStorage.setItem('Userdata', JSON.stringify(userData));
        }

    } catch (error) {
        console.error("Error getting user ID:", error);
    }
}


setInterval(GetMessages, 1000)
export {inputChat, ParseJson, GetId};