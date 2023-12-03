const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.next-button')];
const preBtn = [...document.querySelectorAll('.prev-button')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

// const pbtn = document.getElementById('lefto');
// const nbtn = document.getElementById('righto');

// nbtn.addEventListener('click', () => {
//     pbtn.style.display = 'block';

//     nbtn.style.display = 'none';
// })


// pbtn.addEventListener('click', () => {
//     nbtn.style.display = 'block';

//     pbtn.style.display = 'none';
// })