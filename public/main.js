$("input[type='password']").click(() => {
  $(".left img").attr("src", "images/cover.png");
});

$(".hi").click(() => {
  $(".left img").attr("src", "images/welcome.png");
});

function validatePasswords() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (password !== confirmPassword) {
    message.textContent = "❌ Passwords do not match!";
    message.style.color = "red";
    return false;
  }
  message.textContent = "✅ Passwords match!";
  message.style.color = "green";
  return true;
}

function renderImg(event) {
  console.log(event);
  $(".outputImg").attr("src", URL.createObjectURL(event.target.files[0]));
}

var standard_message = $("#text-area").val();
$("#text-area").focus(function () {
  if ($(this).val() == standard_message) $(this).val("");
});
$("#text-area").blur(function () {
  if ($(this).val() == "") $(this).val(standard_message);
});

function generateMsg(e, x) {
  e.preventDefault();
  const msgElem = document.getElementById("msg");
  if (x == 0) {
    msgElem.textContent = "Please LogIn to Create your own blog!";
  } else if (x == 1) {
    msgElem.textContent = "Please LogIn to Save blogs and watch them later!";
  }
  setTimeout(() => {
    msgElem.textContent = "";
  }, 3000);
}

function changeColor() {}

const saveSvgPaths = document.querySelectorAll(".save-btn path");

saveSvgPaths.forEach((elem) => {
  let currentColor = localStorage.getItem("savedColor") || "#000000";
  elem.setAttribute("fill", currentColor);
  elem.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // Send data silently
    await fetch("/save", {
      method: "post",
      body: formData,
    });
    currentColor = currentColor === "#000000" ? "#D50B8B" : "#000000";
    saveSvgPath.setAttribute("fill", currentColor);
    localStorage.setItem("savedColor", currentColor);
  });
});
