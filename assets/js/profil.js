const profileOption = document.querySelectorAll('.profile-option')
const profileSection = document.querySelectorAll('.profile-section')

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
        fetchTemplate('../../template/Navbar.html'),
    ]).then(([Navbar]) => {
        // Attach navbar to the main HTML
        const header = document.querySelector('header');
        const cloneNavbar = document.importNode(Navbar, true);
        cloneNavbar.querySelector('#homepage-link').href = '../index.html'
        cloneNavbar.querySelector('#logo-on-navbar').src = '../assets/img/ngekost-aja-long-low.png'
        cloneNavbar.querySelector('#search-submit-btn').onclick = 'window.location.href="search.html"'
        header.appendChild(cloneNavbar);
    })
})

let currentSection = profileSection[0]
for (let i = 0; i < profileOption.length; i++) {
    profileOption[i].onclick = ()=> {
        currentSection.style.display = 'none'
        currentSection = profileSection[i]
        currentSection.style.display = 'block'
    }
}