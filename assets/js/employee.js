document.addEventListener('DOMContentLoaded', () => {
    let employeelistElem = document.querySelector(".employeelist");
    let employeeErrormsgElem = document.querySelector('.employee__errormsg');
    fetch('assets/data/employees.json')
        .then((response) => { return response.json() })
        .then((employeeData) => {

            if (employeeData.length != 0) {
                employeeData.forEach(employee => {
                    let employeeElemClone = document.querySelector(".html-templates .employee").cloneNode(true)
                    employeeElemClone.querySelector(".employee__img").src = employee.pictureUrl;
                    employeeElemClone.querySelector(".employee__name").textContent = employee.name;
                    employeeElemClone.querySelector(".employee__position").textContent = employee.position;
                    employeeElemClone.querySelector(".employee__about").textContent = employee.about;

                    employeelistElem.appendChild(employeeElemClone);
                });
            } else {
                employeeErrormsgElem.classList.remove("hidden")
                employeelistElem.classList.add("hidden")
            };

        });

});