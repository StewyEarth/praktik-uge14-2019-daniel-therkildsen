document.addEventListener('DOMContentLoaded', () => {
    let pictureDataElems = document.querySelectorAll(".picture-data div");
    let galleryElem = document.querySelector(".gallery");
    let galleryImgElem = document.querySelector(".gallery__img");
    let galleryImgCounterElem = document.querySelector(".gallery__imgcounter");
    let galleryTitleElem = document.querySelector(".gallery__title");
    let imgIndex = 0;
    let gallery_images = [];
    let previousImgBtn = document.querySelector(".previousimgbtn")
    let nextImgBtn = document.querySelector(".nextimgbtn")

    pictureDataElems.forEach(pictureDataElem => {
        if(pictureDataElem.dataset.imgtitle != undefined && pictureDataElem.dataset.imgtitle != "" &&   pictureDataElem.dataset.imgpath != undefined && pictureDataElem.dataset.imgpath != ""){
            let galleryData = {
                imgtitle: pictureDataElem.dataset.imgtitle,
                imgpath: pictureDataElem.dataset.imgpath,
            }
            gallery_images.push(galleryData)
        }
    });
    console.log(gallery_images)
    if (gallery_images.length != 0){
        showImage();
    }else{
        galleryElem.classList.add("hidden")
    }


    nextImgBtn.addEventListener('click', () => {
        imgIndex++
        restrictImgIndex();
        showImage();
    });
    previousImgBtn.addEventListener('click', () => {
        imgIndex--
        restrictImgIndex();
        showImage();
    });

    function restrictImgIndex(){
        if (imgIndex >= gallery_images.length){
            imgIndex = 0;
        }
        if (imgIndex <= -1){
            imgIndex = gallery_images.length - 1;
        }
    }
    function showImage(){
        galleryImgCounterElem.textContent = `${imgIndex + 1} / ${gallery_images.length}`;
        galleryImgElem.src = gallery_images[imgIndex].imgpath;
        galleryTitleElem.textContent = gallery_images[imgIndex].imgtitle;
    }
});