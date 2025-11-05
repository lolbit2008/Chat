import {inputChat, ParseJson, assainId} from "./ChatInternal.js";
const SignIn = document.querySelector("#SignIn");
const SignInDiv = document.querySelector('#SignInDiv');
const chatBoxDiv = document.querySelector('#chatBoxDiv');
const chatInput = document.querySelector("#ChatInput");
const MenuDiv = document.querySelector("#MenuDiv");
const Menu = document.querySelector("#Menu");
const BackgroundColor = document.querySelector("#BackgroundColor")
const OutlineColor = document.querySelector("#OutlineColor")
let user = null;
let userId = null;

if (localStorage.getItem("Username") && localStorage.getItem("userID")) {
    user = localStorage.getItem("Username")
    userId = localStorage.getItem("userID")
} else if (localStorage.getItem("Username") && !(localStorage.getItem("userID"))) {
    localStorage.setItem("userID", assainId())
} else {
    SignInDiv.style.display = "flex"
}

// Load saved colors on page load
const root = document.documentElement;
if (localStorage.getItem("backgroundColor")) {
    const savedBgColor = localStorage.getItem("backgroundColor");
    root.style.setProperty("--primary-color", savedBgColor);
    BackgroundColor.value = savedBgColor;
}
if (localStorage.getItem("outlineColor")) {
    const savedOutlineColor = localStorage.getItem("outlineColor");
    root.style.setProperty("--border-color", savedOutlineColor);
    OutlineColor.value = savedOutlineColor;
}

chatInput.addEventListener("keydown", (e)=> {
    if (e.key === "Enter" && chatInput.value.trim()) {
        ChatCommands()
        chatInput.value = "";
    }
})

SignIn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        SignInDiv.style.display = "none";
        user = SignIn.value;
        localStorage.setItem("Username", user);
        localStorage.setItem("userID", assainId())
        SignIn.value = "";
        chatInput.focus()
    }
})

chatBoxDiv.addEventListener("click", ()=> {
    chatInput.focus()
})
Menu.addEventListener("click", ()=> {
    switch (MenuDiv.style.display) {
            case "flex":
                MenuDiv.style.display = "none";
                break;
            default:
                MenuDiv.style.display = "flex";
    }
})

BackgroundColor.addEventListener("change", ()=> {
    const root = document.documentElement
    root.style.setProperty("--primary-color", BackgroundColor.value);
    localStorage.setItem("backgroundColor", BackgroundColor.value);
})
OutlineColor.addEventListener("change", ()=> {
    const root = document.documentElement
    root.style.setProperty("--border-color", OutlineColor.value);
    localStorage.setItem("outlineColor", OutlineColor.value);
})

function scrollDown() {
    if (Math.abs(chatBoxDiv.scrollHeight - chatBoxDiv.clientHeight - chatBoxDiv.scrollTop) <= 1) {
    chatBoxDiv.scrollTop = chatBoxDiv.scrollHeight - chatBoxDiv.clientHeight;
  }
}

setInterval(scrollDown, 1000);

function ChatCommands() {
    switch (chatInput.value) {
            case "/Change":
                chatInput.value = "User's can not use this command";
                break;
            case "/Background":
                chatInput.value = "";
                break;
            default:
                let FilteredText = chatInput.value.trim()
                inputChat(FilteredText, user)
                ParseJson(FilteredText, user)
    }
}