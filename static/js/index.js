
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const indicator = document.querySelector(".indicator");

  function updateIndicator(link) {
    const rect = link.getBoundingClientRect();
    const navBarRect = link.closest("nav").getBoundingClientRect();
    indicator.style.left = `${rect.left - navBarRect.left}px`;
    indicator.style.top = `${rect.top - navBarRect.top}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
  }

  function updateOnScroll() {
    let index = sections.length;

    while (--index && window.scrollY + -1 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove("active"));
    if (index >= 0) {
      navLinks[index].classList.add("active");
      updateIndicator(navLinks[index]);
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      navLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
      updateIndicator(link);
    });
  });

  window.addEventListener("scroll", updateOnScroll);
  window.addEventListener("resize", () => {
    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) {
      updateIndicator(activeLink);
    }
  });

  updateOnScroll();
});

function goToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

window.onscroll = function () {
  showBackToTop();
};

function showBackToTop() {
  var button = document.querySelector(".back-to-top");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
