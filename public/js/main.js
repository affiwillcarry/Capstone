document.getElementById("book-now").addEventListener("click", () => {
  window.location.href = "/book";
});

// =============================
// main.js – Community Healthcare Portal
// Handles navigation + appointment form email notifications
// =============================

// ---- Home Page: "Get Started" button ----
document.addEventListener("DOMContentLoaded", () => {
  const bookNowBtn = document.getElementById("book-now");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      window.location.href = "/book";
    });
  }

  // ---- Book Page: Appointment Form ----
  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable button and show sending state
      const submitBtn = form.querySelector(".submit-btn");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      // Collect form data
      const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        clinic: document.getElementById("clinic").value,
        date: document.getElementById("date").value,
        reason: document.getElementById("reason").value,
      };

      console.log("📤 Sending EmailJS request:", templateParams);

      // ---- EmailJS Send ----
      emailjs
        .send("service_xxxxxx", "template_xxxxxx", templateParams)
        .then(
          function (response) {
            console.log("✅ Email sent successfully!", response.status, response.text);

            // Small delay for smooth UX
            setTimeout(() => {
              window.location.href = "/confirmation";
            }, 1000);
          },
          function (error) {
            console.error("❌ Email failed to send:", error);
            alert("Appointment saved, but email could not be sent. Please check your network or EmailJS setup.");
            submitBtn.disabled = false;
            submitBtn.textContent = "Confirm Appointment";
          }
        );
    });
  }
});
