class OwnerSidebar extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })

        // Some HTML element for the component
        shadow.innerHTML = `
        <nav class="position-fixed">
            <header class="p-4">
                <img src="https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?t=st=1720770619~exp=1720774219~hmac=b5bffda522a1687d7366e345348ef2b91d4decf4cb14559194863e2ff4282559&w=1380"
                    alt="Photo Profile" id="user-photo-profile">
                <h5>Stephanie Putri</h5>
            </header>
            <hr>
            <ul class="list-unstyled p-4">
                <li class="m-2">
                    <a href="dashboard.html" class="text-decoration-none text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="nav-option-icon size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span>Aset</span>
                    </a>
                </li>
                <li class="m-2">
                    <a href="pengelola.html" class="text-decoration-none text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="nav-option-icon size-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                        <span>Pengelola</span>
                    </a>
                </li>
            </ul>
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
            background-color: rgb(49, 49, 49);
            color: white;
            width: 250px;
            height: 100%;
        }

        #user-photo-profile {
            border-radius: 50%;
            width: 3rem;
            margin-bottom: 1rem;
        }

        
        .nav-option-icon {
            width: 2rem;
        }
        `

        // Attach Bootstrap and custom CSS to the component
        shadow.append(bootstrapLink)
        shadow.append(style)
    }
}

// Register component to valid HTML element
customElements.define('owner-sidebar', OwnerSidebar)