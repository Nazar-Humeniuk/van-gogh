(function() {
    const textElement = document.getElementById('text-element');
    const body = document.body;

    // Add hover effect to entire text
    textElement.addEventListener('mouseenter', function() {
        body.classList.add('active');
    });

    textElement.addEventListener('mouseleave', function() {
        body.classList.remove('active');
    });

    // Handle click on entire text - redirect to access denied page
    textElement.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'access-denied.html';
    });
})();

