(function() {
    // Hash of the correct password (SHA-256 of "trustno1")
    // Password is no longer stored in plain text - only the hash is stored
    // To generate a new hash for a different password, you can use:
    // Node.js: crypto.createHash('sha256').update('yourpassword').digest('hex')
    // Or in browser console: (async () => { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('yourpassword')); console.log(Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('')); })()
    const correctCodeHash = "203b70b5ae883932161bbd0bded9357e763e63afce98b16230be33f0b94c2cc5";
    
    // Simple hash function using Web Crypto API
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const form = document.getElementById('code-form');
    const codeInput = document.getElementById('code-input');
    const message = document.getElementById('message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const enteredCode = codeInput.value.trim();
        
        // Hash the entered code and compare with stored hash
        const enteredHash = await hashPassword(enteredCode);
        
        if (enteredHash === correctCodeHash) {
            // Success - redirect to success page
            window.location.href = 'success.html';
        } else {
            message.textContent = 'Incorrect code. Try again.';
            message.className = 'message';
            codeInput.value = '';
            codeInput.focus();
        }
    });

    // Clear message on input
    codeInput.addEventListener('input', function() {
        if (message.textContent) {
            message.textContent = '';
        }
    });
})();

