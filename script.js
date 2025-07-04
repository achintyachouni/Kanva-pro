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
            });

            // If this question was not active, open it
            if (!isActive) {
                this.classList.add('active');
                answer.classList.add('show');
                 // Set maxHeight to scrollHeight to allow transition to full height
                answer.style.maxHeight = answer.scrollHeight + 20 + 'px'; // Add a little buffer
                answer.style.paddingBottom = '10px';
            }
        });
    });


    // --- Select Plan Button Click Handler ---
    const selectPlanButtons = document.querySelectorAll('.select-plan-btn');
    const stickyCtaButton = document.querySelector('.sticky-cta .scroll-to-pricing'); // Get the sticky CTA button

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

    // --- Sticky CTA Button Behavior ---
    // If the sticky button just scrolls to #pricing, handle that
    // If it should also select a default plan or just go to checkout, modify here.
    // The current HTML links it to #pricing, so we'll add a smooth scroll.
     if (stickyCtaButton) {
         stickyCtaButton.addEventListener('click', function(event) {
             event.preventDefault(); // Prevent default anchor link behavior
             const targetId = this.getAttribute('href').substring(1);
             const targetElement = document.getElementById(targetId);

             if (targetElement) {
                 window.scrollTo({
                     top: targetElement.offsetTop - 70, // Adjust for fixed header/sticky bar
                     behavior: 'smooth'
                 });
             }
         });
     }

    // Note: The scrolling review animation is handled by CSS.
    // If you needed more control (like pause on hover), you would add JS here
    // to manage the animation state. The CSS version already includes a basic pause on hover.

});
