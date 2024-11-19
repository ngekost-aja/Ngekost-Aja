import KostItem from '../components/KostItem.js';

// let kostData = [];
const fetchKostData = async () => {
    try {
        const response = await fetch('http://ngekost-aja-backend.test/api/kost', {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const productCatalog = document.getElementById('product-catalog');

const createNewRowContainer = () => {
    currentRow = document.createElement('div');
    currentRow.classList.add('row', 'row-cols-auto', 'g-2', 'g-lg-3');
    productCatalog.appendChild(currentRow);
}

let currentRow;
createNewRowContainer();

fetchKostData().then(data => {
    data.forEach(data => {
        if (currentRow.children.length >= 5) {
            createNewRowContainer();
        }
    
        const kostItem = document.createElement('kost-item');
        kostItem.setAttribute('nama-kost', data.nama);
        kostItem.setAttribute('harga-kost', data.harga);
        kostItem.setAttribute('kost-img-thumbnail', '');
        kostItem.setAttribute('alamat-kost', data.alamat);
        kostItem.setAttribute('avg-rating', data.rating);
        kostItem.setAttribute('total-rating', 23);
        kostItem.setAttribute('detail-link', '');
    
        currentRow.appendChild(kostItem);
    });
}).catch(error => {
    console.error('Error: ' + error)
})
