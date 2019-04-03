let cssThemeElem = document.querySelector("#csstheme");
function fetchDone() {
    GetTheme();
    let changeThemeBtnElem = document.querySelector('.switchtheme');
    changeThemeBtnElem.addEventListener('click', () => {
        if (cssThemeElem.dataset.theme == "light") {
            changeTheme("dark")
        } else {
            changeTheme("light")
        };
    });
};
function changeTheme(theme){
    cssThemeElem.href = `assets/css/${theme}theme.css`
    cssThemeElem.dataset.theme = theme
    localStorage.setItem("theme", theme);
}
function GetTheme(){
    if(localStorage.getItem("theme") != null){
        changeTheme(localStorage.getItem("theme"))
    }else{
        localStorage.setItem("theme", "dark");
    }

}