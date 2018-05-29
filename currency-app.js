const axios = require("axios");

// ('USD', 'CAD', 20)
// 20 USD is worth 26 CAD. You can spend these in the following countries: Canada.

// http://data.fixer.io/api/latest?access_key=faac2b3197d6cd37ea1b9e06a56a05ca

const getExchangeRate = async (from, to) => {
  const response = await axios.get(
    "http://data.fixer.io/api/latest?access_key=faac2b3197d6cd37ea1b9e06a56a05ca"
  );
  const euro = 1 / response.data.rates[from];
  const rate = euro * response.data.rates[to];
  return rate;
};

const getCountries = async currencyCode => {
  const response = await axios.get(
    `https://restcountries.eu/rest/v2/currency/${currencyCode}`
  );
  const countries = response.data.map(country => country.name);
  return countries;
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (rate * amount).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in following countries: ${countries.join(
    ", "
  )}.`;
};

// getExchangeRate("GBP", "RUB").then(rate => console.log(rate));
// getCountries("USD").then(countries => console.log(countries));

convertCurrency("USD", "GBP", 100).then(res => console.log(res));
