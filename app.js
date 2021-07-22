// Variables
const displayRate = document.querySelector('#display-rate');

const fromAmount = document.querySelector('#from-amount');
const fromCurrency = document.querySelector('#from-currency');

const toCurrency = document.querySelector('#to-currency');
const toAmount = document.querySelector('#to-amount');

const API_URL = `https://api.exchangerate.host`;


const chartContext = document.querySelector('#chart').getContext('2d');

/**
 * Gets new data from FX API
 *
 * @returns {{}} - the exchange rate payload
 */
async function fetchRateData(apiUrl, init = {}){
    let fxData = {};
    let config = init

    // {
       // 'fx_rates_data' :  fxData.rates
    // }

    const response = await fetch(apiUrl);
    fxData = await response.json();

    // fxData = newRes.response;

    localStorage.setItem('fx_rates_data', JSON.stringify(fxData.rates));
    // localStorage.setItem('init.name[fx_rates_data]', JSON.stringify(fxData.rates));
    // config.forEach(configItem => localStorage.setItem(configItem[0], JSON.stringify(configItem[1]))  )
    localStorage.setItem('fx_last_updated_date', fxData.date);

    return fxData;
}

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

    exchangeRateData = await fetchRateData(`${API_URL}/latest?base=USD`); // get data from Live API


    const rate = exchangeRateData.rates [ currencyTo ];



    displayRate.innerHTML = `1 USD is <span class="text-3xl">${rate.toFixed(2)} ${currencyTo}</span>`;
    toAmount.value = ( rate * amountFrom ).toFixed(2);

    drawChart(currencyTo)
}

// Event Listeners
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);

toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);


calculate();

////////

let timeseriesData  = {} //1

// @TODO: refactor to work inside the `calculate()` function so it responds to all events
async function drawChart(currencyTo){}
// see below:

fetchRateData(`${API_URL}/timeseries?base=USD&start_date=2020-01-01&end_date=2020-01-04`) //2
    .then(response => {
        console.log(response); // 4
        
        timeseriesData = response

        const label = Object.keys(timeseriesData.rates)

        //[{e},{},{},{}]
        const rates =
            Object.values(timeseriesData.rates)
                .map(curr => curr['EUR'].toFixed(2)) // curr [ currencyTo ]

        const FXChart = new Chart(chartContext, {
            type: 'line',
            data: {
                labels: label,
                datasets: [{
                    label: `FX Rates for EUR`,
                    data: rates,
                }],
                borderWidth: 1
            }
        });
    })

// console.log(timeseriesData); //3




// for external ref: https://jsitor.com/qyh7W03iF
