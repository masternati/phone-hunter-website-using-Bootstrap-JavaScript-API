document.getElementById('not-found').style.display='none';
// document.getElementById('spinner').style.display='none';

const loadPhoneHunter = ()=>{
    loadSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = ''
    // fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`)
    .then(res => res.json())
    .then(data => displayHunter(data))
   
}
const loadSpinner=(isLoading)=>{
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none');
    }
}
const displayHunter = phoneHunter =>{
    console.log(phoneHunter.data[0]);
    const displayPhoneHunter = document.getElementById('phone-hunter');
    displayPhoneHunter.innerHTML="";

    if (phoneHunter.data.length === 0) {
        // Display a message when no results are found
        document.getElementById('not-found').style.display='block'
    }
    phoneHunter.data.forEach(phone => {
        const createDiv = document.createElement('div')
        createDiv.classList.add('col')
        console.log(phone);
        createDiv.innerHTML =`
            <div class="card">
            <img src="${phone.image}" class="card-img-top h-50 w-full" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone: ${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                    <button type="button" onclick="loadMoreDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show More</button>
                </div>
            </div>
        `
        displayPhoneHunter.appendChild(createDiv)
        document.getElementById('not-found').style.display='none';
        loadSpinner(false);
    });
};

const loadMoreDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => displayDetails(data.data));
};

const displayDetails = (phoneDetails) => {
    console.log(phoneDetails);
    const moreDetails = document.getElementById('display-more-details');
    moreDetails.innerHTML = '';

    const phoneModalLabel = document.getElementById('phoneModalLabel');
    phoneModalLabel.innerText = phoneDetails.name;

    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
        <h3>Brand: ${phoneDetails.brand ? phoneDetails.brand: 'n/a'}</h3>
        <p>Display Size: ${phoneDetails.mainFeatures.displaySize}</p>
        <p>Mobile Memory: ${phoneDetails.mainFeatures.memory? phoneDetails.mainFeatures.memory: 'n/a'}</p>
        <p>Release Date: ${phoneDetails.releaseDate ? phoneDetails.releaseDate : 'n/a'}</p>
    `;
    
    moreDetails.appendChild(createDiv);
};


//display search result with Enter press
document.getElementById("search-field").addEventListener("keyup", function(event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        loadPhoneHunter();
    }
});

// loadPhoneHunter('iphone');
