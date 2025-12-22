///// Contact Form /////

// Allow only letters + space
function allowOnlyLetters(e) {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
}

// Allow only numbers
function allowOnlyNumbers(e) {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
}

// Inputs
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

// Errors
const errorFirstName = document.getElementById("errorFirstName");
const errorLastName = document.getElementById("errorLastName");
const errorEmail = document.getElementById("errorEmail");
const errorPhone = document.getElementById("errorPhone");
const errorMessage = document.getElementById("errorMessage");

// Button & loader
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const submitBtn = document.getElementById("submitBtn");

// Messages
const successMessage = document.getElementById("successMessage");
const formError = document.getElementById("formError");

const contactForm = document.getElementById("contactForm");

// Restrictions
firstNameInput.addEventListener("input", allowOnlyLetters);
lastNameInput.addEventListener("input", allowOnlyLetters);
phoneInput.addEventListener("input", allowOnlyNumbers);

// Submit
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset messages
  successMessage.style.display = "none";
  formError.style.display = "none";

  errorFirstName.textContent = "";
  errorLastName.textContent = "";
  errorEmail.textContent = "";
  errorPhone.textContent = "";
  errorMessage.textContent = "";

  let isValid = true;

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  // Validation
  if (!firstName) {
    errorFirstName.textContent = "First name is required";
    isValid = false;
  }

  if (!lastName) {
    errorLastName.textContent = "Last name is required";
    isValid = false;
  }

  if (!email) {
    errorEmail.textContent = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorEmail.textContent = "Enter a valid email";
    isValid = false;
  }

  if (!phone) {
    errorPhone.textContent = "Phone number is required";
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    errorPhone.textContent = "Enter valid 10-digit phone number";
    isValid = false;
  }

  if (!message) {
    errorMessage.textContent = "Message is required";
    isValid = false;
  }

  if (!isValid) return;

  // Show spinner
  spinner.classList.remove("d-none");
  btnText.textContent = "Sending...";
  submitBtn.disabled = true;

  // AJAX submit
  fetch("mail.php", {
    method: "POST",
    body: new FormData(contactForm),
  })
    .then((res) => res.text())
    .then(() => {
      successMessage.textContent =
        "Thank you for contacting AS Textiles. Our team will reach out shortly.";
      successMessage.style.display = "block";
      contactForm.reset();
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 3000);
    })
    .catch(() => {
      formError.textContent =
        "Oops! Something went wrong. Please try again later.";
      formError.style.display = "block";
      setTimeout(() => {
        formError.style.display = "none";
      }, 3000);
    })
    .finally(() => {
      spinner.classList.add("d-none");
      btnText.textContent = "Submit";
    });
});
