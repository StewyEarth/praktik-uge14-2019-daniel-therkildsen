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
        };
    });
};
document.addEventListener('DOMContentLoaded', () => {
    
});