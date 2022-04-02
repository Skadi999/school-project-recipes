addEventListeners();

function addEventListeners() {
  document.querySelector('#btnRegUser').addEventListener('click', () => {
    confirmPassword()
  })
}

function confirmPassword() {
  if (document.querySelector('#regPw') === document.querySelector('#regConfirmPw')) {
    return true;
  }
}