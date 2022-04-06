function j4UCarousel(wrapper) {
    const slider = wrapper.querySelector('.slider');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const children = slider.children;
    slider.style.width = 100 * children.length + '%';
    const singleWidth = 100 / children.length;
    for (i = 0; i < children.length; ++i) {
        children[i].style.width = singleWidth + '%';
    }
    let direction = 1;

    if (slider != null) {
        next.addEventListener('click', function () {
            if (direction == -1) {
                direction = 1;
            }
            slider.style.transition = '';
            slider.style.transform = 'translateX(' + singleWidth + '%)';
        });

        prev.addEventListener('click', function () {
            if (direction == 1) {
                direction = -1;
            }
            slider.prepend(slider.lastElementChild);
            slider.style.transform = 'translateX(' + singleWidth +'%)';
            setTimeout(function () { slider.style.transition = ''; slider.style.transform = 'translateX(0)'; });
        });

        slider.addEventListener('transitionend', function () {
            slider.style.transition = 'none';
            if (direction == 1) {
                slider.appendChild(slider.firstElementChild);
                slider.style.transform = 'translateX(0)';
            }
        }, false);
    }
}