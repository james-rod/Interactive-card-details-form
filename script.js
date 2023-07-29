const cardholderName = document.querySelector("#name");
const errorName = document.querySelector("#error-text-name");
const cardNumber = document.querySelector("#card");
const errorNumber = document.querySelector("#error-numbers-format");

const expirationDateElement = document.getElementById("expirationDate");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const errorExpire = document.querySelector("#error-text-expiration");

const cvcNumber = document.querySelector("#cvcNumber");
const errorCVC = document.querySelector("#error-text-cvc");

const confirmButton = document.querySelector(".confirmButton");
const continueBtn = document.querySelector(".continueButton");

const form = document.querySelector("form");
const successContainer = document.querySelector(".outer-container-success");

const cardNumberText = document.querySelector(".number-vl");
const cardNameText = document.querySelector(".name-vl");
const cardCvcText = document.querySelector(".cvv-vl");

cardholderName.addEventListener("input", (e) => {
  if (!e.target.value) {
    cardNameText.innerHTML = "JANE APPLESEED";
  } else {
    cardNameText.innerHTML = e.target.value.toUpperCase();
  }
});

cardNumber.addEventListener("input", (e) => {
  if (!e.target.value) {
    cardNumberText.innerHTML = "0000 0000 0000 0000";
  } else {
    const inputNumbers = e.target.value.replaceAll(" ", "");

    const integerPattern = /^[0-9]+$/;

    if (!integerPattern.test(inputNumbers)) {
      errorNumber.classList.add("show");
    } else {
      errorNumber.classList.remove("show");
    }

    if (e.target.value.length > 15) {
      e.target.value = inputNumbers.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
      cardNumberText.innerHTML = inputNumbers.replace(
        /(\d{4})(\d{4})(\d{4})(\d{0,4})/,
        "$1 $2 $3 $4"
      );
    } else {
      cardNumberText.innerHTML = inputNumbers;
    }
  }
});

monthInput.addEventListener("input", updateExpirationDate);
yearInput.addEventListener("input", updateExpirationDate);

function updateExpirationDate() {
  const month = monthInput.value || "00";
  const year = yearInput.value || "00";
  expirationDateElement.textContent = `${month}/${year}`;
}

cvcNumber.addEventListener("input", (e) => {
  if (!e.target.value) {
    cardCvcText.innerHTML = "000";
  } else {
    cardCvcText.innerHTML = e.target.value;
  }
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (cardholderName.value == "") {
    errorName.classList.add("show");
  } else {
    errorName.classList.remove("show");
  }
  if (cardNumber.value == "") {
    errorNumber.classList.add("show");
  } else {
    errorNumber.classList.remove("show");
  }
  if (monthInput.value == "" && yearInput.value == "") {
    errorExpire.classList.add("show");
  } else {
    errorExpire.classList.remove("show");
  }
  if (cvcNumber.value == "") {
    errorCVC.classList.add("show");
  } else {
    errorCVC.classList.remove("show");
  }

  // To Make sure that all the inputs have been filled out
  const allRequirementsMet =
    cardholderName.value !== "" &&
    cardNumber.value !== "" &&
    monthInput.value !== "" &&
    yearInput.value !== "" &&
    cvcNumber.value !== "";

  if (allRequirementsMet) {
    form.classList.add("hidden");
    successContainer.classList.add("show");
  }
});

continueBtn.addEventListener("click", () => {
  window.location.reload();
});
