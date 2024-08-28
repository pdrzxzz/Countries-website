const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const countriesMain = document.querySelector('#countries-main')

searchForm.addEventListener('submit', async function (evt) {
    evt.preventDefault()

    const searchTerm = searchInput.value
    searchInput.value = ''
    try {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`)
        for (country of res.data) {
            const newSection = document.createElement('section')
            
            newSection.classList.add('country-section')

            countriesMain.append(newSection)
        }

        searchInput['placeholder'] = 'Type country name'
        searchInput.classList.remove('wrong')
    }
    catch {
        searchInput['placeholder'] = 'Try another country'
        searchInput.classList.add('wrong')
    }

})