(function() {
    const correctCodeHash = "a99eaa791cddbdd5fc9c08fb8f3354e5fe1587eea8ef66e39f84983af515d42e";
    
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
        
        const enteredHash = await hashPassword(enteredCode);
        
        if (enteredHash === correctCodeHash) {
            window.location.href = 'success.html';
        } else {
            message.textContent = 'Incorrect code. Try again.';
            message.className = 'message';
            codeInput.value = '';
            codeInput.focus();
        }
    });
    codeInput.addEventListener('input', function() {
        if (message.textContent) {
            message.textContent = '';
        }
    });
})();

