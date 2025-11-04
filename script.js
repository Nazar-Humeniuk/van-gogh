(function() {
    const textElement = document.getElementById('text-element');
    const body = document.body;

    
    textElement.addEventListener('mouseenter', function() {
        body.classList.add('active');
    });

    textElement.addEventListener('mouseleave', function() {
        body.classList.remove('active');
    });

    
    textElement.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'access-denied.html';
    });
})();

