const ChatTextTemplate = document.querySelector('#ChatTextTemplate').content;
const chatBox = document.querySelector('#chatBoxDiv');
GetMessages()

function GetMessages() {
    fetch("/api/messages")
    .then(Response => Response.json())
    .then(data => {
        chatBox.innerHTML = ''; 
        loadMessages(data)
    })
    .catch(error => console.error("Error loading messages:", error));
}

function loadMessages(jsonData) {
    for(let i = 0; i < jsonData.length; i++) {
            inputChat(jsonData[i].Message, jsonData[i].User)
        }
    }

function inputChat(value, user) {
    let chatText = ChatTextTemplate.cloneNode(true);
    let chatTextEl = chatText.querySelector('.chatText')
    chatTextEl.textContent = `${value} - ${user}`;
    chatBox.appendChild(chatText);
}

function ParseJson(value, User) {
    let jsonData = {
        "User": User,
        "userID": 0,
        "MessageId": 0,
        "Message": value
    }
    
fetch("/api/messages", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
})
    .then(response => response.json())
    .then(data => {
        console.log('Message saved successfully:', data);
    })
    .catch(error => {
        console.error('Error saving message:', error);
    });
}

function assainId() {
    return IdList.push(IdList.length)
}

setInterval(GetMessages, 1000)
export {inputChat, ParseJson, assainId};