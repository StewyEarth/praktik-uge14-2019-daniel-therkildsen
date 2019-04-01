document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/partials/headerfooter-partial.html')
        .then((response)=>{return response.text()})
        .then((partialData)=>{
        console.log(partialData);

        let tempParticalContainer = document.createElement("p");
        tempParticalContainer.innerHTML = partialData;

        let headerElem = document.querySelector(".header");
        headerElem.innerHTML = tempParticalContainer.querySelector(".partialheader").innerHTML;

        let footerElem = document.querySelector(".footer");
        footerElem.innerHTML = tempParticalContainer.querySelector(".partialfooter").innerHTML;


        });

});