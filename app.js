// Variables
const displayRate = document.querySelector('#display-rate');

const fromAmount = document.querySelector('#from-amount');
const fromCurrency = document.querySelector('#from-currency');

const toCurrency = document.querySelector('#to-currency');
const toAmount = document.querySelector('#to-amount');

const API_KEY = 'a00ec093a0dfafe2ae27954db000de4c';
const API_URL = `https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}`;

/**
 * Grabs thethe API
 */
function calculate(){

    const currencyTo = toCurrency.value;
    const amountFrom = fromAmount.value;

    const rates = localStorage.getItem('rates');


    // Stringed version
    console.log(rates);
    console.log(`Last Updated @ ${localStorage.getItem('last_updated')}`);

    // converted to look API-version
    console.log(JSON.parse(rates));
    const oldRates = JSON.parse(rates);
    console.log(`AED Rate: ${oldRates[ 'AED' ]} `);

    // ASYNC CALL | React World
    // fetch(API_URL)
    //     .then(response => response.json())
    //     .then(data => {
    //
    //         localStorage.setItem('rates', JSON.stringify(data.response.rates));
    //         localStorage.setItem('last_updated', data.response.date);
    //
    //         // cache our results
    //         // 0. localStorage APIm
    //         // 1. localStorage.setItem('my_user',JSON.stringify({"first_name": "Jake"}))
    //         // 2. const myUser = localStorage.getItem('my_user')
    //         // 3. How it works.
    //         // const user = JSON.parse(myUser) //returns Obj
    //         // `Welcome back ${user.first_name}!`
    //         // localStorage.setItem('someString','Another String')
    //         // JSON -> Objects  to String and Vice Versa
    //         // JSON.stringify({}) | JSON.parse({})
    //
    //         const rate = data.response.rates[ currencyTo ];
    //         displayRate.innerHTML = `1 USD is <span class="text-3xl">${rate} ${currencyTo}</span>`;
    //         toAmount.value = rate * amountFrom;
    //
    //     });
}

// Only call calculate() on a different day-ish
function runCalculation(){


    if(true){
        calculate();
    }
}

// if(day is different //boolean) calculate()

// Event Listeners
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);

toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);


calculate();