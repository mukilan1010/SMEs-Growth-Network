let slideIndex = 0;

function showSlides() {
    const slides = document
        .querySelectorAll('.quote-slide');
    slides.forEach((slide, index) => {
        slide.style.display =
            (index === slideIndex) ? 'block' : 'none';
    });
}

function plusSlides(n) {
    const slides = document
        .querySelectorAll('.quote-slide');
    slideIndex = (slideIndex
        + n + slides.length) % slides.length;
    showSlides();
}

document
    .addEventListener('DOMContentLoaded', () => {
        showSlides();
        // Show the first slide
        setInterval(() => plusSlides(1), 5000);
        // Change slides every 5 seconds
    });
