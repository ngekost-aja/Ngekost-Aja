class KostItem extends HTMLElement {
    constructor() {
        super();

        this.namaKost = ''
        this.hargaKost = ''
        this.kostImgThumbnail = ''
        this.alamatKost = ''
        this.avgRating = ''
        this.totalRating = ''
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="kost-container" style="height: 400px;">
            <a href="/pages/renter/detail-kost.html" class="link-to-detail-kost text-decoration-none">
                <div class="kost-content card h-100">
                    <div class="card-img-top kost-img-thumbnail-container" style="height: 200px;">
                        <img class="kost-img-thumbnail" src="${this.kostImgThumbnail}" alt="Kost thumbnail" style="min-height: 100%; min-width: 100%;">
                    </div>
                    <div class="card-body">
                        <p class="nama-kost fw-medium">${this.namaKost}</p>
                        <p class="harga-kost fw-bold">${this.hargaKost}</p>
                        <p class="alamat-kost" style="font-size: 12px;">${this.alamatKost}</p>
                        <div class="rating-kost d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" style="width: 1rem; align-items: center; color: #FFC400;" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <div class="rating-text">
                                <span class="avg-rating">${this.avgRating}</span> |
                                <span class="total-rating">${this.totalRating}</span> sewa
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `
    }

    static get observedAttributes() {
        return ['nama-kost', 'harga-kost', 'kost-img-thumbnail', 'alamat-kost', 'avg-rating', 'total-rating'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const propName = name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
            this[propName] = newValue;
        }
    }
}

customElements.define('kost-item', KostItem);
