$("input[type='password']").click(() => {
  $(".left img").attr("src", "images/cover.png");
});

$(".hi").click(() => {
  $(".left img").attr("src", "images/welcome.jpg");
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
  const file = event.target.files && event.target.files[0];
  if (!file) {
    console.warn("No file selected.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    $("#outputImg").attr("src", reader.result);
  };

  reader.readAsDataURL(file);
}
