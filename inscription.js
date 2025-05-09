document.getElementById('inscriptionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const pseudo = document.getElementById('pseudo').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    // Récupérer la liste des utilisateurs existants
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(user => user.pseudo === pseudo)) {
        errorMsg.textContent = 'Ce pseudo est déjà utilisé.';
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Les mots de passe ne correspondent pas.';
        return;
    }

    // Hash du mot de passe avec SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Ajouter le nouvel utilisateur à la liste
    users.push({ pseudo, password: hashHex });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Inscription réussie !');
    window.location.href = 'index.html';
}); 