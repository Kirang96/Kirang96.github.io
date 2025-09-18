window.addEventListener("DOMContentLoaded", function() {
    
    // --- LOTTIE ANIMATION LOGIC ---
    lottie.loadAnimation({
        container: document.getElementById('lottie-animation'), // the DOM element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animations/lotte_1.json' // Make sure this path is correct!
    });


    // --- FORM HANDLING LOGIC ---
    // Helper function to handle form submission
    function handleFormSubmit(formId, successMessageId) {
        var form = document.getElementById(formId);
        var successMessage = document.getElementById(successMessageId);

        // Check if the form and success message elements exist before adding listener
        if (form && successMessage) {
            form.addEventListener("submit", function(e) {
                e.preventDefault(); // Prevent the default form submission

                var data = new FormData(form);
                var action = e.target.action;
                
                fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(response => {
                    if (response.ok) {
                        // Show success message and hide the form
                        successMessage.style.display = 'block';
                        form.style.display = 'none';
                        // Also hide the parent of the form if it's the custom container
                        if (form.parentElement.classList.contains('mx-auto')) {
                            form.parentElement.style.display = 'none';
                        }
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                alert(data["errors"].map(error => error["message"]).join(", "));
                            } else {
                                alert('Oops! There was a problem submitting your form');
                            }
                        })
                    }
                }).catch(error => {
                    alert('Oops! There was a problem submitting your form');
                });
            });
        }
    }

    // Initialize for both forms on the page
    handleFormSubmit('waitlist-form', 'waitlist-success-message');
    // Note: Your provided HTML doesn't have a modal form, but the handler is here if you add it.
    // handleFormSubmit('modal-form', 'modal-success-message'); 
});