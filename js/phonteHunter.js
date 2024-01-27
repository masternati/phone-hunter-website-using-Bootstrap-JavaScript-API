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
        createDiv.innerHTML =`
            <div class="card">
            <img src="${phone.image}" class="card-img-top h-50 w-full" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone: ${phone.phone_name}</h5>
                    <p class="card-text">Brand Name: ${phone.brand}</p>
                    <button class="btn btn-primary">Show More</button>
                </div>
            </div>
        `
        displayPhoneHunter.appendChild(createDiv)
        document.getElementById('not-found').style.display='none';
        loadSpinner(false);
    });
};

document.getElementById("search-field").addEventListener("keyup", function(event) {
    // console.log(event.key);
    if (event.key === 'Enter') {
        loadPhoneHunter();
    }
});