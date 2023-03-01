const loadData = async (searchText, dataLimit) => {
	const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
	const res = await fetch(URL);
	const data = await res.json();
	displayPhone(data.data, dataLimit);
};

const displayPhone = (phones, dataLimit) => {
	const phonesContainer = document.getElementById('phones-container');
	phonesContainer.textContent = '';

	// displaying 10 phones only
	const showBtnBox = document.getElementById('btn-show-more-box');

	if (dataLimit && phones.length > 10) {
		phones = phones.slice(0, 10);
		showBtnBox.classList.remove('d-none');
	} else {
		showBtnBox.classList.add('d-none');
	}

	// no phones found alert
	const noPhone = document.getElementById('no-phone-found');
	if (phones.length === 0) {
		noPhone.classList.remove('d-none');
	} else {
		noPhone.classList.add('d-none');
	}

	phones.forEach((phone) => {
		const phoneDiv = document.createElement('div');
		phoneDiv.classList.add('col');
		phoneDiv.innerHTML = `
			<div class="card">
				<img class:"img-fluid card-img" src="${phone.image}" class="card-img-top" alt="..." />
				<div class="card-body">
				<small>${phone.brand}</small>
					<h5 class="card-title">${phone.phone_name}</h5>
					<p class="card-text">
						This is a longer card with supporting text below as a natural lead-in to additional content. This
						content is a little bit longer.
					</p>
					<button class="btn btn-success px-4">Details</button>
				</div>
			</div>
		`;
		phonesContainer.appendChild(phoneDiv);
	});

	// stop loader
	spinner(false);
};

const searchProcess = (dataLimit) => {
	// start loader
	spinner(true);
	const searchField = document.getElementById('search-field');
	const searchText = searchField.value;
	console.log(searchText);
	loadData(searchText, dataLimit);
};
document.getElementById('search-btn').addEventListener('click', function () {
	searchProcess(10);
});
document.getElementById('btn-show-more').addEventListener('click', function () {
	searchProcess();
});
const spinner = (isLoading) => {
	const loader = document.getElementById('loader');
	if (isLoading) {
		loader.classList.remove('d-none');
	} else {
		loader.classList.add('d-none');
	}
};
