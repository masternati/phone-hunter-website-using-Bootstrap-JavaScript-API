const loadPhoneHunter = ()=>{
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.innerHTML = ''

    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    // iPhone 13 Pro
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(res => res.json())
    .then(data => displayHunter(data))
}
const displayHunter = phoneHunter =>{
    console.log(phoneHunter.data[0]);
    const displayPhoneHunter = document.getElementById('phone-hunter');
    displayPhoneHunter.innerHTML="";

    phoneHunter.data.forEach(phone => {
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        createDiv.innerHTML =`
        
            <div class="card">
            <img src="${phone.image}" class="card-img-top h-50 w-full" alt="...">
                <div class="card-body">
                    <h4 class="card-title">Phone Name: ${phone.phone_name}</h4>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                </div>
            </div>
        `
        displayPhoneHunter.appendChild(createDiv)
    });
}
loadPhoneHunter()