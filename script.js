const chatWindow = document.getElementById("chatWindow");
const inputForm = document.getElementById("inputForm");
const messageInput = document.getElementById("messageInput");
const quickReplies = document.getElementById("quickReplies");
const clearBtn = document.getElementById("clearBtn");

const botReplies = [
  "Hi! How can I help you today?",
  "Nice! Tell me more 😊",
  "I can show weather, quotes, or help with small projects.",
  "Great question — I'll look into that for you!",
  "Thanks for trying this demo bot. Have a wonderful day!",
  "If you want code samples, say 'code' or 'project'.",
  "Try asking: 'How to push to GitHub?' or 'Show weather app example.'",
];

function createMsg(text, who = "bot") {
  const el = document.createElement("div");
  el.className = "msg " + (who === "user" ? "user" : "bot");
  el.innerHTML = `<div class="content">${text}</div>`;
  return el;
}

function sendMessage(text) {
  if (!text) return;
  const userMsg = createMsg(escapeHtml(text), "user");
  chatWindow.appendChild(userMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  botTyping();

  const reply = pickBotReply(text);
  const delay = 800 + Math.min(2500, reply.length * 25); 
  setTimeout(() => {
    showBotReply(reply);
  }, delay);
}

let typingNode = null;
function botTyping() {
  if (typingNode) typingNode.remove();
  typingNode = document.createElement("div");
  typingNode.className = "msg bot";
  typingNode.innerHTML = `<div class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
  chatWindow.appendChild(typingNode);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showBotReply(text) {
  if (typingNode) typingNode.remove();
  typingNode = null;

  const msgEl = createMsg("", "bot");
  chatWindow.appendChild(msgEl);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  let i = 0;
  const contentEl = msgEl.querySelector(".content");
  const interval = setInterval(() => {
    contentEl.textContent = text.slice(0, ++i);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}

function pickBotReply(userText) {
  const txt = userText.toLowerCase();
  if (txt.includes("hello") || txt.includes("hi"))
    return "Hello! 👋 I'm a demo bot. Ask me for 'help' or say 'features'.";
  if (txt.includes("help"))
    return "You can try: 'show weather', 'quote', 'projects', or 'git help'.";
  if (txt.includes("weather"))
    return "I can show a weather app example. Try the weather project from the projects list.";
  if (txt.includes("quote"))
    return "Here's a sample quote: “Be yourself; everyone else is already taken.” — Oscar Wilde";
  if (txt.includes("git"))
    return "For Git: git add ., git commit -m 'msg', git push origin main. Need step-by-step?";
  if (txt.includes("code") || txt.includes("project"))
    return "I can generate full project code (HTML/CSS/JS) — which one do you want?";
  return botReplies[Math.floor(Math.random() * botReplies.length)];
}

function escapeHtml(unsafe) {
  return unsafe.replace(/[&<"'>]/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m];
  });
}

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text) return;
  sendMessage(text);
  messageInput.value = "";
  messageInput.focus();
});

quickReplies.addEventListener("click", (e) => {
  if (e.target.classList.contains("qr")) {
    const text = e.target.textContent;
    sendMessage(text);
  }
});

clearBtn.addEventListener("click", () => {
  chatWindow.innerHTML = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    messageInput.blur();
  }
});