// Variables
const displayRate = document.querySelector('#display-rate');

const fromAmount = document.querySelector('#from-amount');
const fromCurrency = document.querySelector('#from-currency');

const toCurrency = document.querySelector('#to-currency');
const toAmount = document.querySelector('#to-amount');

const API_KEY = 'a00ec093a0dfafe2ae27954db000de4c';
const API_URL = `https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}`;

/**
 * Gets new data from FX API
 *
 * @returns {{}} - the exchange rate payload
 */
async function fetchRateData(){
    let fxData = {};

    const response = await fetch(API_URL);
    const newRes = await response.json();

    fxData = newRes.response;

    localStorage.setItem('fx_rates_data', JSON.stringify(fxData.rates));
    localStorage.setItem('fx_last_updated_date', fxData.date);

    return fxData;
}


// setLocalStorage(key,value) // undefined | true | Exception

// getLocalStorage(key) // {}

/**
 * Displays
 */
async function calculate(){
    let exchangeRateData = {};

    const currencyTo = toCurrency.value;
    const amountFrom = fromAmount.value;

    const LSUpdatedDate = localStorage.getItem('fx_last_updated_date');

    // caching rules
    let updatedDate = ( new Date(LSUpdatedDate) ).getDate();
    let todaysDate = ( new Date() ).getDate(); //13

    if(todaysDate !== updatedDate){

        exchangeRateData = await fetchRateData(); // get data from Live API

        console.log(`pulling from LIVE API`);

    } else{

        exchangeRateData = JSON.parse(localStorage.getItem('fx_rates_data'));

        console.log(`pulling from Cached API`);

    }

    const rate = exchangeRateData [ currencyTo ];

    displayRate.innerHTML = `1 USD is <span class="text-3xl">${rate.toFixed(2)} ${currencyTo}</span>`;
    toAmount.value = ( rate * amountFrom ).toFixed(2);

}

// Event Listeners
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);

toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);


calculate();