const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const backTop = document.getElementById("backTop");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-link, .nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const savedTheme = localStorage.getItem("pavan-portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const theme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("pavan-portfolio-theme", theme);
  themeToggle.textContent = theme === "light" ? "☾" : "☼";
});
if (document.body.classList.contains("light") && themeToggle) themeToggle.textContent = "☾";

document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
  let current = "home";
  document.querySelectorAll("main section[id]").forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
  );
  window.location.href = `mailto:pavankumarpanchakarla624@gmail.com?subject=${subject}&body=${body}`;
});
