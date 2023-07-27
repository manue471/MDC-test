document.getElementById('change-text-btn').onclick = function () {
  changeTextValue('text', 'Thanks for the oportunity...');
}

const changeTextValue = (text, value) => {
  const showedText = 'Hello World!!';
  const actualValue = document.getElementById(text).textContent;
  const newValue = value == actualValue ? showedText : value;
  document.getElementById(text).textContent = newValue;
}