// Variables
const displayRate = document.querySelector('#display-rate');

const fromAmount = document.querySelector('#from-amount');
const fromCurrency = document.querySelector('#from-currency');

const toCurrency = document.querySelector('#to-currency');
const toAmount = document.querySelector('#to-amount');

const API_KEY = 'a00ec093a0dfafe2ae27954db000de4c';
const API_URL = `https://api.currencyscoop.com/v1/latest?api_key=${API_KEY}`;


const chartContext = document.querySelector('#chart').getContext('2d');

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

    // if(todaysDate !== updatedDate){

        exchangeRateData = await fetchRateData(); // get data from Live API

        // console.log(`pulling from LIVE API`);

    // } else{

        // exchangeRateData = JSON.parse(localStorage.getItem('fx_rates_data'));

        // console.log(`pulling from Cached API`);

    // }

    console.log(exchangeRateData);
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

////////
const FXLabelData = ['2021-07-10', '2021-07-11', '2021-07-12','2021-07-13']; //
const FXRatesData = [0.24, 0.85, 0.76, 0.9]; //


// for external ref: https://jsitor.com/qyh7W03iF
const FXChart = new Chart(chartContext, {
    type: 'line',
    data: {
        labels: FXLabelData,
        datasets: [{
            label: `FX Rates for EUR`,
            data: FXRatesData,
        }],
        borderWidth: 1
    }
});