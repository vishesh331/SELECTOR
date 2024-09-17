document.addEventListener('DOMContentLoaded', function () {
    // Select the dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Add a click event listener to the button
    darkModeToggle.addEventListener('click', function () {
        // Toggle the 'dark-mode' class on the body
        document.body.classList.toggle('dark-mode');

        // Change button text and style
        if (document.body.classList.contains('dark-mode')) {
            this.textContent = 'Light Mode';
            this.classList.remove('btn-outline-light');
            this.classList.add('btn-outline-dark');
        } else {
            this.textContent = 'Dark Mode';
            this.classList.remove('btn-outline-dark');
            this.classList.add('btn-outline-light');
        }
    });
});
