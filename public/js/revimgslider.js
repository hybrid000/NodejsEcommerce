const imgContainers = [...document.querySelectorAll('.revImgContainer')];
const nextoBtn = [...document.querySelectorAll('.for-btn')];
const prevoBtn = [...document.querySelectorAll('.back-btn')];

imgContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nextoBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    prevoBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})
// $(document).ready(function () {
//     var matched = $(".image-containerz *");
//     alert("Number of elements in content div = " + matched.length);
// });
// console.log(numberOfChildren);
// if (numberOfChildren <= 6) {
//     nextBtn.style.display = "none";
//     prevBtn.style.display = "none";
// } 