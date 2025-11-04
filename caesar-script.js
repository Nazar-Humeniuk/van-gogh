(function() {
    const correctCodeHash = "73b5eae901853ac67a03ca3a96de7585eda01c43fc8b9de53d4caa3b44759f21";
    
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

