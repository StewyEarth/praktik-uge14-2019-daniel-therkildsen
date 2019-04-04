document.addEventListener('DOMContentLoaded', () => {
    let pictureDataElems = document.querySelectorAll(".picture-data div");
    let galleryElem = document.querySelector(".gallery");
    let galleryImgElem = document.querySelector(".gallery__img");
    let galleryImgCounterElem = document.querySelector(".gallery__imgcounter");
    let galleryTitleElem = document.querySelector(".gallery__title");
    let gallery_images = [];
    let previousImgBtn = document.querySelector(".previousimgbtn");
    let nextImgBtn = document.querySelector(".nextimgbtn");
    let galleryAutoBtnElem = document.querySelector('.gallery__autoBtn');
    let galleryErrorMsgElem = document.querySelector('.gallery__errormsg');
    let imgIndex;
    let galleryTimer;

    if (localStorage.getItem("imgIndex") == null) {
        imgIndex = 0;
    } else {
        imgIndex = parseInt(localStorage.getItem("imgIndex"));
    }

    pictureDataElems.forEach(pictureDataElem => {
        if (pictureDataElem.dataset.imgtitle != undefined && pictureDataElem.dataset.imgtitle != "" && pictureDataElem.dataset.imgpath != undefined && pictureDataElem.dataset.imgpath != "") {
            let galleryData = {
                imgtitle: pictureDataElem.dataset.imgtitle,
                imgpath: pictureDataElem.dataset.imgpath,
            }
            gallery_images.push(galleryData)
        }
    });

    if (gallery_images.length != 0) {
        showImage();
    } else {
        galleryElem.classList.add("hidden");
        galleryErrorMsgElem.classList.remove("hidden")

    }

    nextImgBtn.addEventListener('click', () => {
        imgIndex++
        showImage();
        if (galleryAutoBtnElem.classList.contains("btn--success")) {
            stopTimer();
            initiateTimer();
        }

    });
    previousImgBtn.addEventListener('click', () => {
        imgIndex--
        showImage();
        if (galleryAutoBtnElem.classList.contains("btn--success")) {
            stopTimer();
            initiateTimer();
        }
    });

    galleryAutoBtnElem.addEventListener('click', () => {
        if (galleryAutoBtnElem.classList.contains("btn--success")) {
            stopTimer();
            galleryAutoBtnElem.classList.add("btn--error");
            galleryAutoBtnElem.classList.remove("btn--success");
        } else {
            stopTimer();
            initiateTimer();
            galleryAutoBtnElem.classList.add("btn--success");
            galleryAutoBtnElem.classList.remove("btn--error");
        }
    });

    function initiateTimer() {
        galleryTimer = setInterval(() => {
            imgIndex++;
            showImage();
        }, 3000);
    };

    function stopTimer() {
        clearInterval(galleryTimer);
    };

    function restrictImgIndex() {
        if (imgIndex >= gallery_images.length) {
            imgIndex = 0;
        }
        if (imgIndex <= -1) {
            imgIndex = gallery_images.length - 1;
        }
    }
    function showImage() {
        restrictImgIndex();
        localStorage.setItem("imgIndex", imgIndex)
        galleryImgCounterElem.textContent = `${imgIndex + 1} / ${gallery_images.length}`;
        galleryImgElem.src = gallery_images[imgIndex].imgpath;
        galleryTitleElem.textContent = gallery_images[imgIndex].imgtitle;
    }
});