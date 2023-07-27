document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form").addEventListener("submit", onSubmit);
  const email = document.getElementById('email')
  email.addEventListener('change', function validateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.value.match(validRegex)) {
      document.getElementById('email').classList.remove('error');

      return true;
    } else {
      email.classList.add('error');
      email.style.color = 'red';

      setTimeout(() => {
        email.style.color = 'black';
      }, 2000)

      alert("Invalid email address!");

      return false;
    }
  });
});

function validateField(input) {
  if (!!input.value) {
    input.classList.remove('error');
    return true;
  } else {
    input.classList.add('error');
    return false;
  }
}

function onSubmit(e) {
  e.preventDefault();
  const fields = ['name', 'message', 'email']
  const hasInvalidField = fields.map(field => validateField(document.getElementById(field)))
  if (hasInvalidField.includes(false)) alert("fill in all required fields!");
  else alert("Thank you for your message!");
}
