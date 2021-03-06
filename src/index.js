let selectCountry = document.getElementById("formControlSelect1");
let selectState = document.getElementById("formControlSelect2");
let selectCity = document.getElementById("formControlSelect3");
let URL = 'http://localhost:3000/';
let usersList = document.getElementById("usersList");
let submitBtn = document.getElementById('submitBtn');
let country_Id;
let state_Id;
let State;
let place;
let CurentCity;
let CurentState;
let CurentCounrty;
document.addEventListener("DOMContentLoaded", getUsersList(`${URL}users`, usersList));
document.addEventListener("DOMContentLoaded", getCountry(`${URL}countries`, selectCountry));
async function getCountry(url, select) {
    let response = await fetch(url);
    data = await response.json();
    data.forEach(item => {
        let option = document.createElement('option');
        option.innerText = item.name;
        option.dataset.id = item.id;
        option.value = item.id;
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
    getState(`${URL}states`, selectState, country_Id);
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
            option.value = item.id;
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
    getCity(`${URL}cities`, selectCity, state_Id);
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
            option.value = item.id;
            select.appendChild(option);
        }
    });
    return data;
}

function GetStateById(url) {
    fetch(url)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            CurentState = data.name;
        })
    return CurentState;
}

function GetCountryById(url) {
    fetch(url)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            CurentCounrty = data.name;
        })
    return CurentCounrty;
}

function refreshData(select) {
    for (var i = select.length; i >= 1; i--)
        select.remove(i);
}

function getUsersList(url, list) {
    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            data.forEach(item => {
                GetStateById(`${URL}states/${item.state_id}`);
                GetCountryById(`${URL}countries/${item.country_id}`);
                fetch(`${URL}cities/${item.city_id}`)
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(data) {
                        CurentCity = data.name;
                        let date = (new Date(item.createdAt)).toLocaleString();
                        let person = document.createElement('div');
                        person.classList.add('person');
                        let info = `
                      <h2> 
              ${item.name}
               </h2>
               <p class="mail">${item.email}</p>
               <p class="phone">${item.phone_number}</p>
               <p class="city">${CurentCity}, ${CurentState}, ${CurentCounrty}</p>
               <p class="date">${date}</p>
               `;
                        person.innerHTML = info;
                        list.appendChild(person);
                    }).catch(function(err) {
                        console.log(err);
                    });
            })
        });
}
submitBtn.onclick = function handleSubmit() {

    let form = Array.from(document.forms[0]);
    let dataForm = new Object();
    form.forEach(e => {
        e.value == '' ? e.value = null : e.value = e.value;
        dataForm[e.name] = e.value;

    });
    if (!form.filter(el => !el.checkValidity()).length) {
        dataForm["createdAt"] = Date.now();
        fetch(`${URL}users`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            mode: 'cors',
            body: JSON.stringify(dataForm)
        });
    }

}
