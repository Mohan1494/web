function handleSubmit(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const confirmationMessage = document.getElementById('confirmationMessage');

    if (name && validateEmail(email) && age > 0) {
        displayConfirmation(name, email, age); // Show confirmation message
        document.getElementById('userForm').reset(); // Reset the form
    } else {
        alert('Please fill out all fields correctly.');
    }
}

// Simple email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Function to display confirmation message
function displayConfirmation(name, email, age) {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'block';
    confirmationMessage.innerHTML = `
        <strong>Submission Successful!</strong><br>
        Name: ${name}<br>
        Email: ${email}<br>
        Age: ${age}
    `;
}
