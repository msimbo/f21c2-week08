// Variables
const displayRate = document.querySelector('#display-rate');

const fromAmount = document.querySelector('#from-amount');
const fromCurrency = document.querySelector('#from-currency');

const toCurrency = document.querySelector('#to-currency');
const toAmount = document.querySelector('#to-amount');

const API_KEY = 'a00ec093a0dfafe2ae27954db000de4c';
const API_URL = `https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}`;

// functions
// 1. Loads the page and calculates the fx based on the current value
function calculate(){
    // 2. get the respective amounts (from the input box)
    // const currencyFrom = fromCurrency.value;
    const currencyTo = toCurrency.value;

    const amountFrom = fromAmount.value;

    // 2b. Send to the API (*/convert?&from=`fromCurr`&to=`toCurr`&amount=`toAmount`)
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const rate = data.response.rates[ currencyTo ];

            // 3. Give user feedback based on the API data [on dynamic input change]
            displayRate.innerHTML = `1 USD is <span class="text-3xl">${rate} ${currencyTo}</span>`;

            // 3b. when a user changes the fromAmount, update the toAmount (in the input box
            toAmount.value = rate * amountFrom;
        });
}

// Event Listeners
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);

toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);


calculate();