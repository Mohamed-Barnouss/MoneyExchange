"use strict";

let exchangeFrom = document.getElementById("exchangeFrom");
let exchangeTo = document.querySelector("#exchangeTo");
let button = document.querySelector("#btn");
let amountVal = document.getElementById("value");
let resultValue = document.getElementById("valueResult");
let firstFlag = document.querySelector(".first-flag");
let secondFlag = document.querySelector(".second-flag");

//exchange from
let fromConvert;
let nameC = "";
for (let i = 0; i < exchangeFrom.length; i++) {
  exchangeFrom[i].addEventListener("click", function () {
    fromConvert = this.value;
    console.log(`DA CONFERTIRE DA ${fromConvert}`);
    console.log(this.title);
    fetch(`https://restcountries.com/v2/name/${this.title}`)
      .then((el) => el.json())
      .then((data) => {
        console.log(data[0].flags.svg);

        data[0].flags.svg;
        firstFlag.src = data[0].flags.svg;
        firstFlag.classList.remove("hidden");
      })
      .catch((err) => {
        console.log(secondFlag.src);
        secondFlag.src = "";
      });
  });
}

//**************** */

//exchange TO
let toConvert;
let currencySymbol;
for (let i = 0; i < exchangeTo.length; i++) {
  exchangeTo[i].addEventListener("click", function () {
    toConvert = this.value;
    resultValue.value = "";
    fetch(`https://restcountries.com/v2/name/${this.title}`)
      .then((el) => el.json())
      .then((data) => {
        currencySymbol = data[0].currencies[0].symbol;
        console.log(data[0].flags.svg);

        data[0].flags.svg;
        secondFlag.src = data[0].flags.svg;
        secondFlag.classList.remove("hidden");
      })
      .catch((err) => {
        secondFlag.src = "";
      });
  });
}

//button
button.addEventListener("click", function () {
  console.log(`valore inserito ${amountVal.value}`);
  if (amountVal.value === "" || !isFinite(amountVal.value)) {
    alert("You must insert a number");
    amountVal.value = "";
  }
  amountVal.value;
  console.log(`questo ${fromConvert} lo devo convertire a questo ${toConvert}`);
  conversionRare(fromConvert, toConvert, amountVal.value, currencySymbol);
});

//*****FUNCTION***** */
const conversionRare = function (firstValue, convertedValue, amount, symb) {
  if (firstValue === convertedValue) {
    alert("They are the same");
    return;
  }
  const host = "api.frankfurter.app";
  fetch(
    `https://${host}/latest?amount=${amount}&from=${firstValue}&to=${convertedValue}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      let val;
      console.log(data);
      for (var prop in data.rates) {
        val = data.rates[prop];
        break;
      }

      if (!val) {
        alert("ERROR");
      }

      resultValue.value = `${val} ${symb}`;
    })
    .catch((err) => {
      alert(err);
      throw err;
    });
};

const flags = function (countryName) {
  fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then((el) => el.json())
    .then((data) => {
      console.log(data[0].flags.svg);

      data[0].flags.svg;
    });
};
