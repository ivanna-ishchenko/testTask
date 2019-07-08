let selectCountry = document.getElementById("exampleFormControlSelect1");
let selectState = document.getElementById("exampleFormControlSelect2");
let selectCity = document.getElementById("exampleFormControlSelect3");
let url = 'http://192.168.1.188:3000/';

let country_Id;
let state_Id;
document.addEventListener("DOMContentLoaded", getCountry(url + 'countries', selectCountry));
async function getCountry(url, select) {
    let response = await fetch(url);
    let data = await response.json();
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
    getState(url + 'states', selectState, country_Id);
    console.log(country_Id + 'counrty iD');
    return country_Id;
}

async function getState(url, select, country_Id) {
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        if (item.country_id == country_Id) {
            option.innerText = item.name;
            option.dataset.id = item.id;
            select.appendChild(option);
        }


    });
}
selectState.onchange = function getStateId() {
    refreshData(selectCity);
    let indexSelected = selectState.selectedIndex;
    let selectedOption = selectState.querySelectorAll('option')[indexSelected];
    state_Id = selectedOption.getAttribute('data-id');
    getCity(url + 'cities', selectCity, state_Id);
    console.log("Its  state id" + state_Id);
    return state_Id;

}
async function getCity(url, select, state_Id) {
    let response = await fetch(url);
    let data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        if (item.id == state_Id) {
            option.innerText = item.name;
            option.dataset.id = item.id;
            select.appendChild(option);
        }
    });
}

function refreshData(select) {
    for (var i = select.length; i >= 1; i--)
        select.remove(i);
}