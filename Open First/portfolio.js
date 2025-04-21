document.getElementById('portfolio-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the button container element and apply fade-out effect
    var buttonContainer = document.getElementById('button-container');
    var overlay = document.getElementById('overlay');
    
    // Fade out the button
    buttonContainer.classList.add('fade-out'); // Hide the button

    // Show the overlay immediately
    overlay.style.opacity = 0;

    // Wait for 3 seconds, then redirect to the portfolio page
    setTimeout(function() {
        window.location.href = 'portfolio2.html'; // Redirect to portfolio2.html
    }, 500); // Keep the overlay visible for 3 seconds before redirecting
});
