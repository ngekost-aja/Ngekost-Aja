import KostItem from "../../components/KostItem.js";

const kostData = [
    {
        namaKost: 'Kos Merdeka',
        hargaKost: 'Rp 2.000.000/bulan',
        kostImg: 'assets/img/kos-thumbnail.jpg',
        alamatKost: 'Jalan Merdeka, Jakarta',
        ratingKost: '4.7',
        ratingCount: '23',
        detailLink: 'pages/renter/detail-kos1.html'
    },
    {
        namaKost: 'Kos Pahlawan',
        hargaKost: 'Rp 1.500.000/bulan',
        kostImg: 'assets/img/kos-thumbnail2.jpg',
        alamatKost: 'Jalan Pahlawan, Jakarta',
        ratingKost: '4.5',
        ratingCount: '10',
        detailLink: 'pages/renter/detail-kos2.html'
    },
    // More items can be added here...
];


const productCatalog = document.getElementById('product-catalog');

const createNewRowContainer = (currentRow) => {
    currentRow = document.createElement('div');
    currentRow.classList.add('row', 'row-cols-auto', 'g-2', 'g-lg-3');
    productCatalog.appendChild(currentRow);
}

let currentRow;
createNewRowContainer(currentRow);

kostData.forEach(data => {
    if (currentRow.children.length >= 5) {
        createNewRowContainer(currentRow);
    }

    const kostItem = document.createElement('kost-item');
    kostItem.setAttribute('nama-kost', data.namaKost);
    kostItem.setAttribute('harga-kost', data.hargaKost);
    kostItem.setAttribute('kost-img-thumbnail', data.kostImg);
    kostItem.setAttribute('alamat-kost', data.alamatKost);
    kostItem.setAttribute('rating-kost', data.ratingKost);
    kostItem.setAttribute('rating-count', data.ratingCount);
    kostItem.setAttribute('detail-link', data.detailLink);

    currentRow.appendChild(kostItem);
});

document.body.appendChild(container);