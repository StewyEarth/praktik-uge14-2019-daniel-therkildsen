document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/partials/headerfooter-partial.html')
        .then((response) => { return response.text() })
        .then((partialData) => {

            let tempParticalContainer = document.createElement("p");
            tempParticalContainer.innerHTML = partialData;

            let headerElem = document.querySelector(".header");
            headerElem.innerHTML = tempParticalContainer.querySelector(".partialheader").innerHTML;

            let footerElem = document.querySelector(".footer");
            footerElem.innerHTML = tempParticalContainer.querySelector(".partialfooter").innerHTML;
            fetchDone();
        });

    function fetchDone() {
        let cssThemeElem = document.querySelector("#csstheme");
        let changeThemeBtnElem = document.querySelector('.switchtheme');
        changeThemeBtnElem.addEventListener('click', () => {
            if (cssThemeElem.dataset.theme == "light") {
                cssThemeElem.href = "assets/css/darktheme.css"
                cssThemeElem.dataset.theme = "dark"
                localStorage.setItem("theme", "dark");
            } else {
                cssThemeElem.href = "assets/css/lighttheme.css"
                cssThemeElem.dataset.theme = "light"
                localStorage.setItem("theme", "light");
            }
        });
    }
});
