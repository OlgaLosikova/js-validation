const form = document.forms.formReg;
const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const RegName = form.elements.RegName;
const RegEmail = form.elements.RegEmail;
const RegAge = form.elements.RegAge;
const RegSex = form.elements.RegSex;
const RegSelect = form.elements.RegSelect;
const RegPassword = form.elements.RegPassword;
const checkboxReg = form.elements.checkboxReg;
const regButton = form.elements.RegButton;
const errorSelect = document.getElementById("errorSelect");
const errorSex = document.getElementById("errorSex");

const buttonEnabled = () => {
  if (
    RegName.value !== "" &&
    RegEmail.value !== "" &&
    RegAge.value !== "" &&
    RegPassword.value !== "" &&
    checkboxReg.checked &&
    RegSelect.value !== "Укажите профессию" &&
    (RegSex[0].checked || RegSex[1].checked)
  ) {
    regButton.disabled = false;
  } else regButton.disabled = true;
};

form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  console.log(
    `Имя: ${RegName.value}, Email: ${RegEmail.value}, Возраст: ${
      RegAge.value
    }, Прфессия: ${RegSelect.value}, Пол: ${
      document.querySelector('input[name="RegSex"]:checked').value
    }, Пароль: ${RegPassword.value}, Согласие:${checkboxReg.value}`
  );

  form.reset();
});

RegName.oninput = function () {
  const errorName = document.getElementById("errorName");

  if (
    RegName.value.length < 2 ||
    RegName.value.length > 20 ||
    RegName.value === ""
  ) {
    errorName.textContent = ` Имя должно содержать от 2 до 20 символов`;
  } else {
    errorName.textContent = "";
  }
  buttonEnabled();
};

RegEmail.oninput = function () {
  const errorEmail = document.getElementById("errorEmail");
  if (RegEmail.value.match(mailFormat) && RegEmail.value !== "") {
    errorEmail.textContent = "";
  } else {
    errorEmail.textContent = "Email должен содержать символ '@' и доменное имя";
  }
  buttonEnabled();
};
RegAge.oninput = function () {
  const errorAge = document.getElementById("errorAge");
  if (RegAge.value > 0 && RegAge.value !== "") {
    errorAge.textContent = "";
  } else {
    errorAge.textContent = "Возраст должен быть больше нуля";
  }
  buttonEnabled();
};

RegPassword.oninput = function () {
  const errorPassword = document.getElementById("errorPassword");
  if (RegPassword.value.length > 8 && RegPassword.value !== "") {
    errorPassword.textContent = "";
  } else {
    errorPassword.textContent = "Длина пароля минимум 8 символов";
  }
  buttonEnabled();
};
checkboxReg.onclick = function () {
  const errorCheck = document.getElementById("errorCheckbox");
  if (!checkboxReg.checked) {
    errorCheck.textContent = "Отметьте согласие на обработку данных";
  } else {
    errorCheck.textContent = "";
  }
  buttonEnabled();
};
RegSelect.onchange = function () {
  if (RegSelect.value === "Укажите профессию") {
    errorSelect.textContent = "Выберите профессию из списка";
  } else {
    errorSelect.textContent = "";
  }
  buttonEnabled();
};
for (let i = 0; i < RegSex.length; i++) {
  RegSex[i].onclick = function () {
    if (RegSex[i].checked) {
      errorSex.textContent = "";
    } else errorSex.textContent = "Укажите пол";
    buttonEnabled();
  };
}
