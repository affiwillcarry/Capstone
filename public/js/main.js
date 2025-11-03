// =============================
// main.js – Community Healthcare Portal
// Handles navigation + EmailJS appointment confirmation
// =============================

// ---- Home Page: "Get Started" button ----
document.addEventListener("DOMContentLoaded", () => {
  const bookNowBtn = document.getElementById("book-now");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      window.location.href = "/book";
    });
  }

  // ---- Book Appointment Page ----
  const form = document.querySelector("form.clean-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector(".submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        clinic: document.getElementById("clinic").value,
        date: document.getElementById("date").value,
        reason: document.getElementById("reason").value,
      };

      console.log("📤 Sending EmailJS with params:", templateParams);

      // ✅ Your real EmailJS details
      emailjs
        .send("service_p2nx89g", "template_illv0yi", templateParams)
        .then(
          (response) => {
            console.log("✅ SUCCESS!", response.status, response.text);
            submitBtn.textContent = "Confirmed ✓";

            setTimeout(() => {
              window.location.href = "/confirmation";
            }, 1200);
          },
          (error) => {
            console.error("❌ FAILED...", error);
            alert("Email could not be sent. Please check your EmailJS setup or internet connection.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Appointment";
