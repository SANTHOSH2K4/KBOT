const chatbotButton = document.getElementById("chatbot-button");
const chatContainer = document.getElementById("chat-container");
const closeButton = document.getElementById("close-button");
const chatLog = document.getElementById("chat-log");
const sugge1 = document.getElementById("suggest1");
const sugge2 = document.getElementById("suggest2");

// Add an event listener to the "Send" button

chatbotButton.addEventListener("click", function () {
  chatContainer.style.right = "0";
  chatbotButton.style.display = "none";
  localStorage.setItem("chatOpen", "true"); // Store it as a string
});

closeButton.addEventListener("click", function () {
  chatContainer.style.right = "-500px";
  chatbotButton.style.display = "block";
  localStorage.setItem("chatOpen", "false"); // Store it as a string
});

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;

  // Clone the user and bot response templates
  const userTemplate = document
    .querySelector(".you-answer-template")
    .cloneNode(true);
  const botTemplate = document
    .querySelector(".bot-answer-template")
    .cloneNode(true);
  userTemplate.classList.remove("you-answer-template");
  userTemplate.classList.add("you-answer");

  botTemplate.classList.remove("bot-answer-template");
  botTemplate.classList.add("bot-answer");
  userTemplate.removeAttribute("style");
  botTemplate.removeAttribute("style");

  // Set the user input text
  userTemplate.querySelector(".up").textContent = message;

  // Append the user input to the chat log
  const chatLog = document.getElementById("chat-log");
  chatLog.appendChild(userTemplate);

  // Send the user input to Django view using Fetch API
  $.ajax({
    url: "/sol/", // Replace with your actual endpoint URL
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ message: message }),
    success: function (data) {
      // Set the bot response text
      botTemplate.querySelector(".bp").textContent = data.bot_response;
      if (data.img != "none") {
        botTemplate.querySelector(".botimg").src = data.img;
        botTemplate.querySelector(".botimg").style.width = "200px";
        botTemplate.querySelector(".botimg").style.height = "200px";
      }
      // Append the bot response to the chat log
      chatLog.appendChild(botTemplate);

      // Clear the message input field
      messageInput.value = "";
      console.log(chatLog.lastChild);
      scrollIntoBottom();
      // Scroll to the bottom of the chat log
      // const targetDiv = document.getElementsByClassName("bot-answer");
      // targetDiv.scrollIntoView({ behavior: "smooth" });
      const s1 = document.getElementById("suggestion1");
      if (data.sugg1 != "") {
        s1.textContent = data.sugg1;
        sugge1.style.display = "block";
      } else {
        sugge1.style.display = "none";
      }

      const s2 = document.getElementById("suggestion2");
      if (data.sugg2 != "") {
        s2.textContent = data.sugg2;
        sugge2.style.display = "block";
      } else {
        sugge2.style.display = "none";
      }

      // Set the src attribute
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
  scrollIntoBottom();
}

// Call sendMessage when the send button is clicked
const sendButton = document.getElementById("send-button");
sendButton.addEventListener("click", function () {
  sendMessage();
});

// Call sendMessage when the enter key is pressed
const messageInput = document.getElementById("message");
messageInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

const scrollIntoBottom = () => {
  chatLog.scrollTo(0, chatLog.scrollHeight);
};

// setInterval(() => {
//   scrollIntoBottom();
// }, 2000);

// messageInput.addEventListener("keyup", function (event) {
//   if (event.key === "Enter") {
//     // Prevent the default behavior of the Enter key (form submission)
//     event.preventDefault();

//     // Call the sendMessage function when Enter key is pressed
//     sendMessage();
//   }
// });

const suggestionButton1 = document.getElementById("suggest1");
suggestionButton1.addEventListener("click", function () {
  const message = suggestionButton1.textContent;

  const userTemplate = document
    .querySelector(".you-answer-template")
    .cloneNode(true);
  const botTemplate = document
    .querySelector(".bot-answer-template")
    .cloneNode(true);
  userTemplate.classList.remove("you-answer-template");
  userTemplate.classList.add("you-answer");

  botTemplate.classList.remove("bot-answer-template");
  botTemplate.classList.add("bot-answer");
  userTemplate.removeAttribute("style");
  botTemplate.removeAttribute("style");

  // Set the user input text
  userTemplate.querySelector(".up").textContent = message;

  // Append the user input to the chat log
  const chatLog = document.getElementById("chat-log");
  chatLog.appendChild(userTemplate);

  // Send the user input to Django view using Fetch API
  $.ajax({
    url: "/sol/", // Replace with your actual endpoint URL
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ message: message }),
    success: function (data) {
      // Set the bot response text
      botTemplate.querySelector(".bp").textContent = data.bot_response;

      // Append the bot response to the chat log
      chatLog.appendChild(botTemplate);

      // Clear the message input field
      messageInput.value = "";
      console.log(chatLog.lastChild);
      scrollIntoBottom();
      // Scroll to the bottom of the chat log
      // const targetDiv = document.getElementsByClassName("bot-answer");
      // targetDiv.scrollIntoView({ behavior: "smooth" });
      const s1 = document.getElementById("suggestion1");
      if (data.sugg1 != "") {
        s1.textContent = data.sugg1;
        sugge1.style.display = "block";
      } else {
        sugge1.style.display = "none";
      }

      const s2 = document.getElementById("suggestion2");
      if (data.sugg2 != "") {
        s2.textContent = data.sugg2;
        sugge2.style.display = "block";
      } else {
        sugge2.style.display = "none";
      }

      if (data.img != "none") {
        botTemplate.querySelector(".botimg").src = data.img;
        botTemplate.querySelector(".botimg").style.width = "200px";
        botTemplate.querySelector(".botimg").style.height = "200px";
      }

      // Set the style attribute
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
  scrollIntoBottom();
});

const suggestionButton2 = document.getElementById("suggest2");
suggestionButton2.addEventListener("click", function () {
  const message = suggestionButton2.textContent;

  const userTemplate = document
    .querySelector(".you-answer-template")
    .cloneNode(true);
  const botTemplate = document
    .querySelector(".bot-answer-template")
    .cloneNode(true);
  userTemplate.classList.remove("you-answer-template");
  userTemplate.classList.add("you-answer");

  botTemplate.classList.remove("bot-answer-template");
  botTemplate.classList.add("bot-answer");
  userTemplate.removeAttribute("style");
  botTemplate.removeAttribute("style");

  // Set the user input text
  userTemplate.querySelector(".up").textContent = message;

  // Append the user input to the chat log
  const chatLog = document.getElementById("chat-log");
  chatLog.appendChild(userTemplate);

  // Send the user input to Django view using Fetch API
  $.ajax({
    url: "/sol/", // Replace with your actual endpoint URL
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({ message: message }),
    success: function (data) {
      // Set the bot response text
      botTemplate.querySelector(".bp").textContent = data.bot_response;

      // Append the bot response to the chat log
      chatLog.appendChild(botTemplate);

      // Clear the message input field
      messageInput.value = "";
      console.log(chatLog.lastChild);
      scrollIntoBottom();
      // Scroll to the bottom of the chat log
      // const targetDiv = document.getElementsByClassName("bot-answer");
      // targetDiv.scrollIntoView({ behavior: "smooth" });
      const s1 = document.getElementById("suggestion1");
      if (data.sugg1 != "") {
        s1.textContent = data.sugg1;
        sugge1.style.display = "block";
      } else {
        sugge1.style.display = "none";
      }

      const s2 = document.getElementById("suggestion2");
      if (data.sugg2 != "") {
        s2.textContent = data.sugg2;
        sugge2.style.display = "block";
      } else {
        sugge2.style.display = "none";
      }

      if (data.img != "none") {
        botTemplate.querySelector(".botimg").src = data.img;
        botTemplate.querySelector(".botimg").style.width = "200px";
        botTemplate.querySelector(".botimg").style.height = "200px";
      }
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
  scrollIntoBottom();
});
