const chatHistory = document.getElementById('chatHistory');
const userInput = document.getElementById('userInput');
const themeToggle = document.getElementById('themeToggle');

let darkMode = false;
let userName = '';
let nameAsked = false;
let usedAffirmations = [];

const affirmations = [
    "You are amazing just the way you are! 💖",
    "Believe in yourself, always! ✨",
    "Every day is a fresh start 🌸",
    "You are capable of wonderful things 💎",
    "Keep shining, the world needs your light 🌟",
];

const happyWords = ["happy","excited","good","amazing","fantastic","love"];

// Initial greeting
addBotMessage("Hello! 🌸 I’m GlowBot. What’s your name?");

// Toggle dark mode
themeToggle.addEventListener('change', () => {
    darkMode = themeToggle.checked;
    if(darkMode){
        document.documentElement.style.setProperty('--bg-color','#1e003b');
        document.documentElement.style.setProperty('--chat-bg','#3d0075');
        document.documentElement.style.setProperty('--bot-msg','#8e44ad');
        document.documentElement.style.setProperty('--user-msg','#9b59b6');
        document.documentElement.style.setProperty('--header-bg','#6f2da8');
    } else {
        document.documentElement.style.setProperty('--bg-color','#fcefee');
        document.documentElement.style.setProperty('--chat-bg','#fff0f6');
        document.documentElement.style.setProperty('--bot-msg','#ffb6c1');
        document.documentElement.style.setProperty('--user-msg','#ffd6e8');
        document.documentElement.style.setProperty('--header-bg','#ff69b4');
    }
});

function sendMessage(){
    const msg = userInput.value.trim();
    if(!msg) return;

    displayMessage(msg,'user-msg');

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-msg';
    typingDiv.innerText = '...';
    chatHistory.appendChild(typingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    setTimeout(() => {
        chatHistory.removeChild(typingDiv);
        const botMsg = getBotResponse(msg);
        if(botMsg) displayMessage(botMsg,'bot-msg',true);
    }, 800);

    userInput.value = '';
}

function displayMessage(message, className, sparkle=false){
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = message;

    if(sparkle){
        for(let i=0;i<3;i++){
            const sparkleEl = document.createElement('div');
            sparkleEl.className = 'sparkle';
            msgDiv.appendChild(sparkleEl);
        }
    }

    const timeSpan = document.createElement('div');
    timeSpan.className = 'timestamp';
    const now = new Date();
    timeSpan.innerText = `${now.getHours()}:${now.getMinutes().toString().padStart(2,'0')}`;
    msgDiv.appendChild(timeSpan);

    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function getBotResponse(input){
    const text = input.toLowerCase();

    if(!nameAsked){
        userName = input || "Friend";
        nameAsked = true;
        return `Nice to meet you, ${userName}! 🌸 Here's your daily affirmation: ${randomAffirmation()}`;
    }

    for(let word of happyWords){
        if(text.includes(word)){
            return "Great to hear that! 😄 Keep shining!";
        }
    }

    if(text.includes("affirmation") || text.includes("motivate")){
        return randomAffirmation(); // unique affirmation each time
    } else if(text.includes("bye")){
        return `Goodbye ${userName}! Stay radiant 💖`;
    } else {
        return "I’m here to cheer you up! 💖 Type 'motivate me' for a unique affirmation.";
    }
}

function randomAffirmation(){
    if(usedAffirmations.length === affirmations.length){
        usedAffirmations = [];
    }
    let index;
    do{
        index = Math.floor(Math.random() * affirmations.length);
    } while(usedAffirmations.includes(index));
    usedAffirmations.push(index);
    return affirmations[index];
}

function addBotMessage(msg){
    displayMessage(msg,'bot-msg',true);
}
