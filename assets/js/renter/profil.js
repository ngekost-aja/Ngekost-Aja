const profileOption = document.querySelectorAll('.profile-option')
const profileSection = document.querySelectorAll('.profile-section')

let currentSection = profileSection[0]
for (let i = 0; i < profileOption.length; i++) {
    profileOption[i].onclick = ()=> {
        currentSection.style.display = 'none'
        currentSection = profileSection[i]
        currentSection.style.display = 'block'
    }
}