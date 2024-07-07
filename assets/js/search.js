document.addEventListener('DOMContentLoaded', () => {
    function fetchTemplate(url) {
        return fetch(url)
            .then(response => response.text())
            .then(templateHTML => {
                const temp = document.createElement('div');
                temp.innerHTML = templateHTML.trim();
                return temp.querySelector('template').content
            })
            .catch(error => console.error(`Error fetching template from ${url}:`, error));
    }

    Promise.all([
        fetchTemplate('../../template/KostItem.html')
    ]).then(([KostItem]) => {
        // Attach kostItem to the main HTML
        const dataKost = [
            {
                namaKost: 'Kost Graha Indah',
                kostThumbnail: '../assets/img/rumah-kost-tampak-depan-1.jpg',
                hargaKost: 'Rp 850.000/bulan',
                alamatKost: 'Kecamatan Lowokwaru, Kota Malang',
                rating: '4.7 | 23 sewa'
            },
            {
                namaKost: 'Kost Mawar Indah',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 967.000/bulan',
                alamatKost: 'Kecamatan Ubud, Kab. Gianyar',
                rating: '4.6 | 65 sewa'
            },
            {
                namaKost: 'Kost Langit Cerah',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 765.000/bulan',
                alamatKost: 'Kecamatan Ubud, Kab. Gianyar',
                rating: '4.4 | 120 sewa'
            },
            {
                namaKost: 'Kost Mutiara Biru',
                hargaKost: 'Rp 1.400.000/bulan',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                alamatKost: 'Kecamatan Blimbing, Kota Malang',
                rating: '4.6 | 17 sewa'
            },
            {
                namaKost: 'Kost Kenanga',
                hargaKost: 'Rp 666.000/bulan',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                alamatKost: 'Kecamatan Lowokwaru, Kota Malang',
                rating: '4.2 | 90 sewa'
            },
            {
                namaKost: 'Kost Harmoni',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 930.000/bulan',
                alamatKost: 'Kecamatan Sukun, Kota Malang',
                rating: '4.4 | 30 sewa'
            },
            {
                namaKost: 'Kost Dahlia',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 700.000/bulan',
                alamatKost: 'Kecamatan Rungkut, Kota Surabaya',
                rating: '3.8 | 23 sewa'
            },
            {
                namaKost: 'Kost Puri Asri',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 1.000.000/bulan',
                alamatKost: 'Kecamatan Sukun, Kota Malang',
                rating: '4.9 | 5 sewa'
            },
            {
                namaKost: 'Kost Flamboyan',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 2.120.000',
                alamatKost: 'Kecamatan Sukolilo, Kota Surabaya',
                rating: '4.6 | 18 sewa'
            },
            {
                namaKost: 'Kost Andalas',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 810.000/bulan',
                alamatKost: 'Kecamatan Ubud, Kab. Gianyar',
                rating: '4.3 | 67 sewa'
            },
            {
                namaKost: 'Kost Melati Indah',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 765.000/bulan',
                alamatKost: 'Kecamatan Blimbing, Kota Malang',
                rating: '4.6 | 34 sewa'
            },
            {
                namaKost: 'Kost Bintang Timur',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 1.100.000/bulan',
                alamatKost: 'Kecamatan Sukun, Kota Malang',
                rating: '4.1 | 25 sewa'
            },
            {
                namaKost: 'Kost Cenderawasih',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 570.000/bulan',
                alamatKost: 'Kecamatan Sukolilo, Kota Surabaya',
                rating: '4.5 | 27 sewa'
            },
            {
                namaKost: 'Kost Nusa Indah',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 1.220.000/bulan',
                alamatKost: 'Kecamatan Ubud, Kab. Gianyar',
                rating: '4.4 | 54 sewa'
            },
            {
                namaKost: 'Kost Agung Jalan Jakarta',
                kostThumbnail: '../assets/img/ngekost-aja-logo.png',
                hargaKost: 'Rp 620.000/bulan',
                alamatKost: 'Kecamatan Sukun, Kota Malang',
                rating: '4.3 | 7 sewa'
            }
        ]

        function createElement(data) {
            const clone = document.importNode(KostItem, true)
            clone.querySelector('.nama-kost').textContent = data.namaKost
            clone.querySelector('.kost-img-thumbnail').src = data.kostThumbnail
            clone.querySelector('.harga-kost').textContent = data.hargaKost
            clone.querySelector('.alamat-kost').textContent = data.alamatKost
            clone.querySelector('.rating-text').textContent = data.rating
            return clone
        }

        const container = document.querySelectorAll('.container-row')
    
        // Add new kost item to HTML
        let currentData = 0
        const totalItemPerRow = 2
        for (let i = 0; i < container.length; i++) {
            for (let j = 0; j < totalItemPerRow && currentData != dataKost.length; j++) {
                const item = createElement(dataKost[currentData])
                container[i].appendChild(item)
                currentData++
            }
        }
    })
})