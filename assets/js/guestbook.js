document.addEventListener('DOMContentLoaded', () => {
    let guestbookformElem = document.querySelector('.guestbookform');
    let guestbookform_nameElem = document.querySelector(".guestbookform #name");
    let guestbookform_emailElem = document.querySelector(".guestbookform #email");
    let guestbookform_messageElem = document.querySelector(".guestbookform #message");
    let guestbook_errormsgElem = document.querySelector('.guestbook-entries__errormsg');
    let guestbookformThanksmsg = document.querySelector('.guestbookform__thanksmsg');
    let guestbookEntrylistElem = document.querySelector('.guestbook-entrylist');
    let entryTemplate = document.querySelector('.html-templates .entry');
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let guestbookEntries = [];

    if (localStorage.getItem("guestEntries") != null) {
        guestbookEntries = JSON.parse(localStorage.getItem("guestEntries"));
        console.log(guestbookEntries)
        guestbookEntries.forEach(entry => {
            createBookEntry(entry,"after");
        });
    } else {
        guestbook_errormsgElem.classList.remove("hidden");
    }

    guestbookformElem.addEventListener('submit', (event) => {
        let problem = false;
        let guestbookEntry = {}
        event.preventDefault();
        if (guestbookform_nameElem.value.length >= 2 && isNaN(guestbookform_nameElem.value)) {
            guestbookform_nameElem.classList.remove("invalidfield");

        } else {
            console.log("fucked")
            guestbookform_nameElem.classList.add("invalidfield");
            problem = true
        }
        if (guestbookform_emailElem.value.length > 0) {
            if (validateEmail(guestbookform_emailElem.value)) {
                guestbookform_emailElem.classList.remove("invalidfield");
            } else {
                guestbookform_emailElem.classList.add("invalidfield")
                problem = true
            }
        } else {
            guestbookform_emailElem.classList.remove("invalidfield");
        }
        if (guestbookform_messageElem.value.length > 3) {
            guestbookform_messageElem.classList.remove("invalidfield");

        } else {
            guestbookform_messageElem.classList.add("invalidfield")
            problem = true
        }
        if (problem != true) {
            guestbookEntry.name = guestbookform_nameElem.value;
            guestbookEntry.message = guestbookform_messageElem.value;
            guestbookEntry.email = guestbookform_emailElem.value;

            let date = new Date;
            let acutalDate = `${date.getDay()}. ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

            guestbookEntry.date = acutalDate;

            guestbookEntries.unshift(guestbookEntry)
            localStorage.setItem("guestEntries", JSON.stringify(guestbookEntries));

            guestbook_errormsgElem.classList.add("hidden")
            guestbookformElem.classList.add("hidden")
            guestbookformThanksmsg.classList.remove("hidden");
            createBookEntry(guestbookEntry,"before")
        }

    });

    function createBookEntry(entry,where) {
        let entryHTMLClone = entryTemplate.cloneNode(true);
        entryHTMLClone.querySelector(".entry__personinfo").textContent = entry.name;
        if (entry.email != "") {
            entryHTMLClone.querySelector(".entry__personinfo").textContent += ` (${entry.email})`;
        }
        entryHTMLClone.querySelector(".entry__date").textContent = ` ${entry.date}`;
        entryHTMLClone.querySelector(".entry__message").textContent = entry.message;
        if(where == "after"){
            guestbookEntrylistElem.appendChild(entryHTMLClone);
        }else if(where == "before"){
            console.log(guestbookEntrylistElem.firstChild)
            if(guestbookEntrylistElem.firstChild != null){
                guestbookEntrylistElem.insertBefore(entryHTMLClone, guestbookEntrylistElem.childNodes[0]);
            }else{
                guestbookEntrylistElem.appendChild(entryHTMLClone);
            }

        }

    }

    function validateEmail(email) {
        let regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return regex.test(email);
    }
});