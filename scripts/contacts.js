document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const submitBtn = form.querySelector(".submit-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation check (HTML5 `required` will handle this too)
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Disable button & show loading indicator style
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Simulate async form submission process (replace with actual API call)
    setTimeout(() => {
      alert(
        "Thank you for your message, " + name + "! I will get back to you soon."
      );

      // Reset form & button state
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "SEND MESSAGE";
    }, 1500);
  });
});
