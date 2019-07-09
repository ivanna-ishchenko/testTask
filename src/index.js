let selectCountry = document.getElementById("formControlSelect1");
let selectState = document.getElementById("formControlSelect2");
let selectCity = document.getElementById("formControlSelect3");
let URL = 'http://192.168.1.188:3000/';
let usersList = document.getElementById("usersList");
let country_Id;
let state_Id;
let State;

// let StatesArr;


// let CitiesArr;
document.addEventListener("DOMContentLoaded", getUsersList(URL + 'users', usersList));
// document.addEventListener("DOMContentLoaded", getStates(url + 'states'));
// document.addEventListener("DOMContentLoaded", getCities(url + 'cities'));



// async function getCountries(url) {
//     let response = await fetch(url);
//     CountriesArr = await response.json();
//     return CountriesArr;
// }

// async function getStates(url) {
//     let response = await fetch(url);
//     StatesArr = await response.json();
//     return StatesArr;
// }
// async function getCities(url) {
//     let response = await fetch(url);
//     CitiesArr = await response.json();
//     return CitiesArr;
// }

document.addEventListener("DOMContentLoaded", getCountry(URL + 'countries', selectCountry));
async function getCountry(url, select) {
    let response = await fetch(url);
    data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        option.innerText = item.name;
        option.dataset.id = item.id;
        select.appendChild(option);
    });

    return data;
}
selectCountry.onchange = function getCountryId() {

    refreshData(selectCity);
    refreshData(selectState);
    let indexSelected = selectCountry.selectedIndex;
    let selectedOption = selectCountry.querySelectorAll('option')[indexSelected];
    country_Id = selectedOption.getAttribute('data-id');
    getState(URL + 'states', selectState, country_Id);
    console.log(country_Id + 'counrty iD');
    return country_Id;
}

async function getState(url, select, country_Id) {
    let response = await fetch(url);
    data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        if (item.country_id == country_Id) {
            option.innerText = item.name;
            option.dataset.id = item.id;
            select.appendChild(option);
        }


    });
    return data;
}
selectState.onchange = function getStateId() {
    refreshData(selectCity);
    let indexSelected = selectState.selectedIndex;
    State = selectState.querySelectorAll('option')[indexSelected];
    state_Id = State.getAttribute('data-id');
    getCity(URL + 'cities', selectCity, state_Id);
    console.log("Its  state id" + state_Id);
    console.log(State);
    return state_Id;

}


async function getCity(url, select, state_Id) {
    let response = await fetch(url);
    data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        if (item.id == state_Id) {
            option.innerText = item.name;
            option.dataset.id = item.id;
            select.appendChild(option);
        }
    });
    return data;
}
///

////
function refreshData(select) {
    for (var i = select.length; i >= 1; i--)
        select.remove(i);
}
let city;

function getUsersList(url, list) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            data.forEach(item => {

                console.log(item.city_id);
                fetch('http://192.168.1.188:3000/cities/' + item.city_id)
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(data) {
                        console.log(data.name);
                       city = ` <p class="number">${data.name}</p>`;
                       let person = document.createElement('div');
                person.classList.add('person');
                let info = `
               <h2>
                   ${item.name}
               </h2>
               <p class="mail">${item.email}</p>
               <p class="number">${item.phone_number}</p>
               <p class="number">${city}</p>
             
               `;
                person.innerHTML = info;
              
                list.appendChild(person);
          
            }).catch(function(err) {
                        console.log(err);
                    });
             
                
        
    })
});
}


// fetch(URL + 'users', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({

//         name: "John",
//         email: "john@example.com"

//     })
// });