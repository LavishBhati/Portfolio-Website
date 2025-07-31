// JavaScript for mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    // Toggle aria-expanded attribute for accessibility
    mobileMenuButton.setAttribute('aria-expanded', !isHidden);
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
for (let link of mobileMenuLinks) {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false'); // Reset aria-expanded
    });
}

// Scroll-triggered animations
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) { // Reveal when element is 100px from bottom
            revealElements[i].classList.add('visible');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on initial load

// Web3Forms Contact Form
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    const json = JSON.stringify(object);
    result.innerHTML = "Please wait..."; // Show loading message

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let jsonResponse = await response.json(); // Renamed to avoid conflict with 'json' variable
            if (response.status === 200) { // Use strict equality
                result.innerHTML = "Form submitted successfully!";
                result.classList.add('text-green-500');
                result.classList.remove('text-red-500'); // Ensure red class is removed
            } else {
                console.error("Web3Forms error:", jsonResponse); // Log error for debugging
                result.innerHTML = jsonResponse.message || "Something went wrong!"; // Use message from response if available
                result.classList.add('text-red-500');
                result.classList.remove('text-green-500'); // Ensure green class is removed
            }
        })
        .catch(error => {
            console.error("Fetch error:", error); // Log fetch error
            result.innerHTML = "Something went wrong! Please check your internet connection.";
            result.classList.add('text-red-500');
            result.classList.remove('text-green-500');
        })
        .finally(function() { // Use finally to ensure reset and timeout always run
            form.reset();
            setTimeout(() => {
                result.innerHTML = "";
                result.classList.remove('text-green-500', 'text-red-500');
            }, 3000);
        });
});
