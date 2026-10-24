
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formStatus.textContent =
        "The form is working, but message delivery has not been configured yet.";

    contactForm.reset();
});
const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}