export default class KostItem extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        // Create a template for the component
        shadow.innerHTML = `
        <div class="kost-container">
            <a href="#" class="link-to-detail-kost text-decoration-none">
                <div class="kost-content card h-100">
                    <div class="card-img-top kost-img-thumbnail-container">
                        <img class="kost-img-thumbnail" alt="Kost thumbnail">
                    </div>
                    <div class="card-body">
                        <p class="nama-kost fw-medium"></p>
                        <p class="harga-kost fw-bold"></p>
                        <p class="alamat-kost fs-sm"></p>
                        <div class="rating-kost d-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clip-rule="evenodd" />
                            </svg>
                            <div class="rating-text">
                                <span class="avg-rating"></span> |
                                <span class="total-rating"></span> sewa
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `;

        // Bootstrap style for this component
        const bootstrapLink = document.createElement('link')
        bootstrapLink.setAttribute('rel', 'stylesheet')
        bootstrapLink.setAttribute('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH')
        bootstrapLink.setAttribute('crossorigin', 'anonymous')
        bootstrapLink.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css')

        // Custom style CSS for this component
        const style = document.createElement('style')
        style.textContent = `
            .kost-img-thumbnail-container {
                height: 14rem;
            }

            .kost-img-thumbnail {
                min-width: 100%;
                min-height: 100%;
            }

            .rating-text {
                margin-left: .5rem;
            }

            .star-icon {
                width: 1rem;
                align-items: center;
                color: #FFC400;
            }
        `;

        shadow.append(bootstrapLink);
        shadow.append(style)
    }

    static get observedAttributes() {
        return ['nama-kost', 'harga-kost', 'kost-img-thumbnail', 'alamat-kost', 'avg-rating', 'total-rating', 'detail-link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const element = this.shadowRoot.querySelector(`.${name}`);
        switch (name) {
            case 'harga-kost':
                this.shadowRoot.querySelector('.harga-kost').textContent = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(newValue)
                break;
            case 'kost-img-thumbnail':
                this.shadowRoot.querySelector('.kost-img-thumbnail').src = newValue;
                break;
            case 'detail-link':
                this.shadowRoot.querySelector('.link-to-detail-kost').href = newValue;
                break;
            case 'avg-rating':
                const avgRating = newValue === null || newValue === 'null' ? 0 : newValue;
                this.shadowRoot.querySelector('.avg-rating').textContent = avgRating;
                break;
            default:
                element.textContent = newValue;
                break;
        }
    }
}

customElements.define('kost-item', KostItem);
