const nbtn = document.getElementById('sex');
const pbtn = document.getElementById('sexy');

nbtn.addEventListener('click', () => {
    pbtn.style.display = 'block';

    nbtn.style.display = 'none';
})


pbtn.addEventListener('click', () => {
    nbtn.style.display = 'block';

    pbtn.style.display = 'none';
})

const prContainers = [...document.querySelectorAll('.image-container')];
const nextBtn = [...document.querySelectorAll('.next-btn')];
const prevBtn = [...document.querySelectorAll('.prev-btn')];

prContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
        // document.getElementsByClassName('prev-btn').style.display="block";
        // prevBtn.style.display="block";
    })

    prevBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})


