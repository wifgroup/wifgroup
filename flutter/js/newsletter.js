function subscribeNewsletter() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    if (email && email.includes('@')) {
        alert(`🎉 Thanks for subscribing with ${email}!`);
        emailInput.value = '';
    } else {
        alert('❗ Please enter a valid email address.');
    }
}
