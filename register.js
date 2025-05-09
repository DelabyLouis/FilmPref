document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pseudo = document.getElementById('pseudo').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Les mots de passe ne correspondent pas.';
        return;
    }

    // Hash du mot de passe avec SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Stockage dans le localStorage
    localStorage.setItem('user', JSON.stringify({ pseudo, password: hashHex }));
    alert('Inscription réussie !');
    document.getElementById('registerForm').reset();
}); 