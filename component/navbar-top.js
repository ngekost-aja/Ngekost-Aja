class NavbarTop extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        // Some HTML element for the component
        shadow.innerHTML = `
        <nav class="navbar navbar-expand-lg d-flex p-2 fixed-top">
            <a class="nav-option navbar-brand" href="#" id="homepage-link">
                <img src="assets/img/ngekost-aja-long-low.png" id="logo-on-navbar" alt="Logo Ngekost-Aja!">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <form class="d-flex justify-content-center w-100" role="search" method="get" action="pages/search.html">
                <input class="form-control me-2" type="search" placeholder="Cari kos di sekitarmu!" aria-label="Search">
                <button class="btn" id="search-submit-btn" type="submit"
                    onclick="window.location.href='./search.html'">Search</button>
            </form>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <div class="navbar-nav d-flex">
                    <a class="nav-option side-nav-option nav-link" href="#" id="notifikasi-option">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="side-nav-option-icon size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </a>
                    <a class="nav-option side-nav-option nav-link" href="#" id="chat-option">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="side-nav-option-icon size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                    </a>
                </div>
            </div>
            <a href="./profil.html" class="nav-option side-nav-option nav-link" id="profil-option">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="side-nav-option-icon size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>                      
            </a>
        </nav>
        `
        // Bootstrap style for this component
        const bootstrapLink = document.createElement('link')
        bootstrapLink.setAttribute('rel', 'stylesheet')
        bootstrapLink.setAttribute('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH')
        bootstrapLink.setAttribute('crossorigin', 'anonymous')
        bootstrapLink.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css')
        
        // Custom style CSS for this component
        const style = document.createElement('style')
        style.textContent = `
            nav {
                background-color: #EDCD44!important;
                font-weight: bolder;
            }

            .nav-item {
                display: flex;
                justify-content: right;
            }
                
            #search-submit-btn {
                background-color: black;
                color: white;
            }

            .nav-option {
                color: black;
            }

            .side-nav-option {
                padding: 0;
                width: 3rem;
                height: 3rem;
            }

            .side-nav-option-icon {
                width: 100%;
                height: 100%;
            }
                
            #logo-on-navbar {
                width: 10rem;
            }
            `
        
        // Attach Bootstrap and custom CSS to the component
        shadow.append(bootstrapLink)
        shadow.append(style)
    }

    static get observedAttributes() {
        return ['data-profil-href']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'data-profil-href' && this.shadowRoot) {
            const linkPlace = this.shadowRoot.querySelector('#profil-option')
            if (linkPlace) {
                linkPlace.setAttribute('href', newValue)
            }
        }
    }
}

// Register component to valid HTML element
customElements.define('navbar-top', NavbarTop)