document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const responseMsg = document.getElementById("contact-response");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    responseMsg.textContent = "Enviando mensaje...";

    setTimeout(() => {
      responseMsg.textContent = "¡Mensaje enviado con éxito! Gracias por contactarnos.";
      form.reset();
    }, 1500);
  });
});
