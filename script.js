const searchForm = document.querySelector('#search-form')
const countriesMain = document.querySelector('#countries-main')
const searchInput = document.querySelector('#search-input')
const languageInput = document.querySelector('#language-input')
const themeButton = document.querySelector('#theme-button')
const allButtons = document.querySelectorAll('button')
const h1 = document.querySelector('h1')

let searchInputFocused = false;

function changeTheme() {
    document.body.classList.toggle('dark-body')
    h1.classList.toggle('dark-text')
    themeButton.classList.toggle('dark-button')
    for (button of allButtons) {
        button.classList.toggle('dark-button')
    }
}
themeButton.addEventListener('click', changeTheme)

for (button of allButtons) {
    button.addEventListener('mousedown', function () {
        this.classList.add('clicked')
    })

    button.addEventListener('mouseup', function () {
        this.classList.remove('clicked')
    })

    button.addEventListener('mouseleave', function () {
        this.classList.remove('clicked')
    })

}


searchForm.addEventListener('submit', async function (evt) {
    evt.preventDefault() //prevent page reload

    const searchTerm = searchInput.value //read from text input
    searchInput.value = '' //blank text input

    try {
        countriesMain.replaceChildren() //remove all children of countriesMain

        let language = languageInput.value //get language

        const res = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`) //send request

        let countryCounter = 0; //12 countries per page
        for (country of res.data) {
            if (countryCounter >= 12) { //page control
                break;
            }
            countryCounter++;
            const newSection = document.createElement('section') //create country section
            newSection.classList.add('country-section')

            const countryNameSpan = document.createElement('span')
            countryNameSpan.classList.add('country-name-span')
            if (language == 'en') {
                countryNameSpan.innerText = country.name.common
            }
            else {
                countryNameSpan.innerText = country.translations[language].common //show country name based on language chosen
            }
            countryNameSpan.classList.add('none') //not show country name beforehand

            const newSectionImg = document.createElement('img')
            newSectionImg.src = country.flags.png
            newSectionImg.classList.add('country-section-flag')

            //show country name on hover logic
            newSection.addEventListener('mouseenter', function () {
                countryNameSpan.classList.remove('none')
            })

            newSection.addEventListener('mouseleave', function () {
                countryNameSpan.classList.add('none')
            })

            //append country section to main
            newSection.append(newSectionImg, countryNameSpan)
            countriesMain.append(newSection)
        }

        //normalize input text
        searchInput['placeholder'] = 'Type country name'
        searchInput.classList.remove('wrong')
    }
    catch {
        searchInput['placeholder'] = 'Try another country'
        searchInput.classList.add('wrong')
    }

})