// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- FAQ Toggle ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');

            // Close all answers first
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
                 q.nextElementSibling.style.maxHeight = null; // Reset maxHeight for transition
                 q.nextElementSibling.style.paddingBottom = null; // Reset padding
                 q.nextElementSibling.style.paddingTop = null; // Reset padding
            });

            // If this question was not active, open it
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
                 // Set maxHeight to scrollHeight to allow transition to full height
                 // Add extra pixels to ensure content fits well + padding
                answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
                answer.style.paddingBottom = '10px';
                 answer.style.paddingTop = '10px';
            }
        });
    });


    // --- Select Plan Button Click Handler ---
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');

    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.price-card');
            if (card) {
                const planName = card.dataset.planName;
                const planPrice = card.dataset.planPrice;

                const selectedPlan = {
                    name: planName,
                    price: planPrice
                };

                // Store selected plan details in localStorage
                localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));

                // Redirect to the checkout page
                window.location.href = 'checkout.html';
            }
        });
    });

    // --- Sticky CTA Button Scroll Handler ---
    const stickyCtaButton = document.querySelector('.sticky-cta .scroll-to-pricing'); // Get the sticky CTA button
     if (stickyCtaButton) {
         stickyCtaButton.addEventListener('click', function(event) {
             event.preventDefault(); // Prevent default anchor link behavior
             const targetId = this.getAttribute('href').substring(1);
             const targetElement = document.getElementById(targetId);

             if (targetElement) {
                 // Get the height of the sticky CTA to adjust scroll position
                 const stickyCtaHeight = document.querySelector('.sticky-cta').offsetHeight;
                 window.scrollTo({
                     top: targetElement.offsetTop - stickyCtaHeight - 20, // Adjust for sticky bar height + a little extra space
                     behavior: 'smooth'
                 });
             }
         });
     }


     // --- Initialize Swiper Slider for Reviews ---
     const swiper = new Swiper('.review-slider', { // Use the class you put on the swiper container
        slidesPerView: 1, // Show 1 slide per view by default
        spaceBetween: 30, // Space between slides
        loop: true, // Enable looping
        autoplay: { // Enable autoplay
            delay: 5000, // 5 seconds between slides
            disableOnInteraction: false, // Keep autoplaying even if user interacts
        },
        pagination: { // Enable pagination dots
            el: '.swiper-pagination',
            clickable: true, // Dots are clickable
        },
        navigation: { // Enable navigation arrows
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: { // Adjust number of slides per view based on screen width
            768: { // When screen width is >= 768px
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: { // When screen width is >= 1024px
                slidesPerView: 3,
                spaceBetween: 40 // Increase space on larger screens
            }
        }
     });

});
