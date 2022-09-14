//selecting html elements.
let dropList = document.querySelectorAll("select");
let fromCurrency = document.querySelector("#exFrom");
let toCurrency = document.querySelector("#exTo");
let submit = document.querySelector("#submit");
let reverse = document.querySelector("#reverse");
let output = document.querySelector(".output");

//fetching currencies into the select options.
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in currency_codes) {
    let selected;
    if (i === 0) {
      if (currency_code === "USD") {
        selected = "selected";
      } else {
        selected = "";
      }
    } else {
      if (currency_code === "CAD") {
        selected = "selected";
      } else {
        selected = "";
      }
    }
    let optionTag = `<option value="${currency_code}" ${selected}> ${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
window.addEventListener("load", () => {
  calculate();
});
submit.addEventListener("click", (e) => {
  e.preventDefault();
  calculate();
});

reverse.addEventListener("click", (e) => {
  e.preventDefault();
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  calculate();
});

function loadFlag(nation) {
  for (let i in currency_codes) {
    if (i === nation.value) {
      imgTag = nation.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${currency_codes[
        i
      ].toLowerCase()}.png`;
    }
  }
}

function calculate() {
  let x = toCurrency.value
  x = x.slice(0, x.length - 1).toLowerCase()
  document.body.style.backgroundImage = `url("https://raw.githubusercontent.com/hampusborgos/country-flags/main/png1000px/${x}.png")`;
  let amount = document.querySelector("#amonutToConvert").value;
  if (amount <= 0 || isNaN(amount)) {
    output.innerText = "Enter amount to convert...";
  } else {
    output.innerText = "Fetching exchange rates....";
    let url = `https://v6.exchangerate-api.com/v6/4ef46ab5e9c0415a463e72d8/latest/${fromCurrency.value}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        let exRate = result.conversion_rates[toCurrency.value];
        let total = exRate * amount;
        output.innerText = `${amount} ${fromCurrency.value} = ${total.toFixed(
          2
        )} ${toCurrency.value}`;
      })

      .catch(() => {
        console.log("something went wrong.");
      });
  }

}

