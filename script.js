const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const form = document.querySelector("#contact-form");
const toast = document.querySelector("#form-toast");
const toastTitle = document.querySelector("#toast-title");
const toastMessage = document.querySelector("#toast-message");
const backToTop = document.querySelector(".back-to-top");
let toastTimer;

const showToast = (type, title, message) => {
  clearTimeout(toastTimer);
  toast.classList.toggle("error", type === "error");
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 6000);
};

toast.querySelector("button").addEventListener("click", () => {
  clearTimeout(toastTimer);
  toast.classList.remove("show");
});

const closeMenu = () => {
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Abrir menu");
};

menuButton.addEventListener("click", () => {
  const willOpen = !navigation.classList.contains("open");
  navigation.classList.toggle("open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

const updateScrollControls = () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
  backToTop.classList.toggle("visible", reachedBottom);
};

window.addEventListener("scroll", updateScrollControls, { passive: true });
updateScrollControls();

document.querySelectorAll("[data-message]").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#message").value = link.dataset.message;
  });
});

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add("visible");
});

document.querySelector("#year").textContent = new Date().getFullYear();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submit = form.querySelector("button[type='submit']");
  const data = new FormData(form);
  submit.disabled = true;
  submit.textContent = "Enviando...";
  try {
    if (!window.emailjs) throw new Error("Serviço de e-mail indisponível");
    window.emailjs.init({ publicKey: "nnv44NWLMjbKHD01j" });
    await window.emailjs.send("service_33xj1o7", "template_ao8fmjx", {
      to_name: "Gabriel Yorramn",
      from_name: data.get("name"),
      message: `Nome do cliente: ${data.get("name")}\nE-mail: ${data.get("email")}\nTelefone: ${data.get("phone")}\n\nMensagem: ${data.get("message")}`,
      to_email: "bielyorramn@gmail.com",
      reply_to: data.get("email")
    });
    form.reset();
    showToast("success", "Mensagem enviada", "Obrigado! Retornarei em breve.");
  } catch (error) {
    console.error("Falha ao enviar o formulário:", error);
    showToast("error", "Não foi possível enviar", "Tente novamente ou fale comigo pelo WhatsApp.");
  } finally {
    submit.disabled = false;
    submit.innerHTML = 'Enviar minha mensagem <span aria-hidden="true">&#8594;</span>';
  }
});
