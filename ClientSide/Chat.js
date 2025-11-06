import {ParseJson} from './ChatInternal.js';
export {scrollDown};

const SignIn = document.querySelector('#SignIn');
const SignInDiv = document.querySelector('#SignInDiv');
const chatBoxDiv = document.querySelector('#chatBoxDiv');
const chatInput = document.querySelector('#ChatInput');
const MenuDiv = document.querySelector('#MenuDiv');
const Menu = document.querySelector('#Menu');
const BackgroundColor = document.querySelector('#BackgroundColor');
const OutlineColor = document.querySelector('#OutlineColor');

const root = document.documentElement; 

let UserData = null;

function saveUserData() {
    if (UserData) {
        localStorage.setItem('Userdata', JSON.stringify(UserData));
    }
}

function loadUserData() {
    if (localStorage.getItem('Username')) {
        localStorage.clear();
    } 
    
    const savedData = localStorage.getItem('Userdata');
    if (savedData) {
        UserData = JSON.parse(savedData);


        if (UserData.Pref && UserData.Pref.length === 2) {
            root.style.setProperty('--primary-color', UserData.Pref[0]);
            root.style.setProperty('--border-color', UserData.Pref[1]);
            
            BackgroundColor.value = UserData.Pref[0];
            OutlineColor.value = UserData.Pref[1];
        }
        
        if (SignInDiv) {
            SignInDiv.style.display = 'none';
        }
    } else {
        if (SignInDiv) {
            SignInDiv.style.display = 'flex';
        }
    }
}

function scrollDown() {
   chatBoxDiv.scrollTop = chatBoxDiv.scrollHeight - chatBoxDiv.clientHeight;
}

async function ChatCommands(InValue) {
    
    const username = UserData ? UserData.Username : 'guest'; 

    switch (InValue) {
        case '/Change': 
            chatInput.value = "Users can not use this command";
            break;
        default:

            await ParseJson(InValue, username); 
    }
}

loadUserData();
setInterval(scrollDown, 1000);

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        ChatCommands(chatInput.value.trim());
        chatInput.value = ''; 
    }
});

SignIn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const user = SignIn.value.trim();
        if (user) { 
            SignInDiv.style.display = 'none';
            UserData = {
                Username: user,
                UserId: null, 
                Pref: [BackgroundColor.value, OutlineColor.value] 
            };
            saveUserData();
            SignIn.value = '';
            chatInput.focus();
        }
    }
});

chatBoxDiv.addEventListener('click', () => {
    chatInput.focus();
});

Menu.addEventListener('click', () => {
    
    MenuDiv.style.display = (MenuDiv.style.display === 'flex') ? 'none' : 'flex';
});

BackgroundColor.addEventListener('change', () => {
    root.style.setProperty('--primary-color', BackgroundColor.value);
    if (UserData) {
        UserData.Pref[0] = BackgroundColor.value;
        saveUserData(); 
    }
});

OutlineColor.addEventListener('change', () => {
    root.style.setProperty('--border-color', OutlineColor.value);
    if (UserData) {
        UserData.Pref[1] = OutlineColor.value;
        saveUserData(); 
    }
});
