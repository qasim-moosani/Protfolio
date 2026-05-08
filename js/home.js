/* ===== EmailJS Contact Form ===== */

// Replace the three values below after completing the EmailJS setup steps
var EMAILJS_PUBLIC_KEY  = "NvKfSSNEUEKiwi_jt";   // Account → API Keys → Public Key
var EMAILJS_SERVICE_ID  = "gmail_Qasali";   // Email Services → Service ID
var EMAILJS_TEMPLATE_ID = "template_unmnv5p";  // Email Templates → Template ID

(function () {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

var form      = document.querySelector("form");
var submitBtn = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Button loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending…';

        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(function () {
                form.reset();
                showFormAlert("success", "Message sent! I'll get back to you soon.");
            })
            .catch(function (err) {
                console.error("EmailJS error:", err);
                showFormAlert("error", "Couldn't send the message. Please email me directly at qmoosani289@gmail.com");
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
            });
    });
}

function showFormAlert(type, message) {
    var existing = document.getElementById("form-alert");
    if (existing) existing.remove();

    var div = document.createElement("div");
    div.id = "form-alert";
    div.style.cssText =
        "margin-top:14px; padding:14px 18px; border-radius:10px; font-size:0.9rem; font-weight:500; display:flex; align-items:center; gap:10px;";

    if (type === "success") {
        div.style.background = "rgba(16,185,129,0.1)";
        div.style.color      = "#059669";
        div.style.border     = "1px solid rgba(16,185,129,0.3)";
        div.innerHTML = '<i class="bi bi-check-circle-fill"></i> ' + message;
    } else {
        div.style.background = "rgba(239,68,68,0.08)";
        div.style.color      = "#DC2626";
        div.style.border     = "1px solid rgba(239,68,68,0.2)";
        div.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> ' + message;
    }

    form.appendChild(div);
    setTimeout(function () { if (div.parentNode) div.remove(); }, 6000);
}
