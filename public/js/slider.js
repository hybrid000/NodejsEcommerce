// const carouselslide=document.querySelector('.slide');
// const carouselimages= document.querySelector('.slider img')


// const prebtn=document.querySelector('.prebtn');
// const nxtbtn=document.querySelector('.nxtbtn');

// let counter=1;
// const size=carouselimages[0].clientwidth;
// carouselslide.getElementsByClassName.transform='translateX('+(-size*counter)+ 'px);

let flag = 0;

function controller(x) {

    flag = flag + x;
    slideshow(flag);
}

slideshow(flag);

function slideshow(num) {

    let slides = document.getElementsByClassName('slide');

    if (num == slides.length) {
        flag = 0;
        num = 0;
    }
    if (num < 0) {

        flag = slides.length - 1;
        num = slides.length - 1;
    }



    for (let y of slides) {
        y.style.display = "none";
    }
    slides[num].style.display = "block";
    slides[num].style.transition=cubic-bezier(0.075, 0.82, 0.165, 1);
    
}




