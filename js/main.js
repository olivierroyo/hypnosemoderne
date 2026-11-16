// Ouverture / fermeture modal
function openModal() {
  document.getElementById("feedbackModal").style.display = "block";
}
function closeModal() {
  document.getElementById("feedbackModal").style.display = "none";
}
window.onclick = function (event) {
  const modal = document.getElementById("feedbackModal");
  if (event.target === modal) closeModal();
};

// Confirmation d'envoi de formulaire
function showConfirmation(event) {
  event.preventDefault();
  const form = event.target;
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { Accept: "application/json" },
  }).then((response) => {
    if (response.ok) {
      form.innerHTML = "<p>✅ Merci ! Votre message a été envoyé.</p>";
    } else {
      form.innerHTML = "<p>❌ Une erreur est survenue. Veuillez réessayer.</p>";
    }
  });
  return false;
}

// Burger menu mobile
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    if(hamburger) {
        hamburger.addEventListener('click', function () {
            document.getElementById('nav-links').classList.toggle('show');
        });
    }
});
