const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let wealth = 0;

//array for random users
let data = [];

getRandomUser();

// fetch random users and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    //console.log(user.name.first);

    //an object
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    //console.log(newUser);

    addData(newUser);
}

//Double the money (use of map)
function doubleMoney() {
    data = data.map(function (user) {

        //spread operator
        return { ...user, user: user.name = 'Pran', money: user.money * 2 };
    });
    wealth = 0;

    updateDOM();
}

// Sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
    if (wealth != 0) {
        return;
    }
    wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
        wealth
    )}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add new obj to data arr
function addData(obj) {
    data.push(obj);
    wealth = 0;

    updateDOM();
}

//Update DOM with new user (Use of forEach)

//provideData = data means if nothing is passed in, take data as default parameter
function updateDOM(providedData = data) {
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    //we can add more parameters in the function of forEach for index or whole array etc, go through forEach documentation
    providedData.forEach(function (item) {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>
        ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);