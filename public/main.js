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
  $("#outputImg").attr("src", URL.createObjectURL(event.target.files[0]));
}

var standard_message = $("#text-area").val();
$("#text-area").focus(function () {
  if ($(this).val() == standard_message) $(this).val("");
});
$("#text-area").blur(function () {
  if ($(this).val() == "") $(this).val(standard_message);
});

const isLoggedIn = false;



