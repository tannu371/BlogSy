$("input[type='password']").click(() => {
  $("form img").attr("src", "images/cover.png");
});

$(".hi").click(() => {
  $("form img").attr("src", "images/welcome.jpg");
});

function readURL(event) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('form img').attr('src', e.target.result).width(150).height(200);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

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




