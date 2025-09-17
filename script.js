window.addEventListener("DOMContentLoaded", function() {
    // Helper function to handle form submission
    function handleFormSubmit(formId, successMessageId) {
        var form = document.getElementById(formId);
        var successMessage = document.getElementById(successMessageId);

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

    // Initialize for both forms
    handleFormSubmit('waitlist-form', 'waitlist-success-message');
    handleFormSubmit('modal-form', 'modal-success-message');
});