export default query => {
    return document.querySelectorAll(query).length === 1 ?
        document.querySelector(query) : [...document.querySelectorAll(query)]
}