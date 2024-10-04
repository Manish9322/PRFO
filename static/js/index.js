document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  const indicator = document.querySelector(".indicator");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navBar = document.querySelector("nav");

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

  hamburgerMenu.addEventListener("click", function () {
    navBar.classList.toggle("active");
  });

  navBar.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      navBar.classList.remove("active");
    }
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

$(document).ready(function () {
  $("#contactForm").on("submit", function (event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      url: "/submit",
      data: $(this).serialize(),
      success: function () {
        $("#contactForm")[0].reset();
      },
      error: function () {},
    });
  });
});

function toggleMenu() {
  const navLinks = document.getElementById("nav-link");
  navLinks.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const menu = document.querySelector("#nav-link");
  const hamburger = document.querySelector("#hamburger-menu");

  // Used to Check if the click was outside the menu and hamburger
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.classList.remove("active");
  }
});

function setupModal(cardId, modalId) {
  const card = document.getElementById(cardId);
  const modal = document.getElementById(modalId);
  const closeButton = modal.querySelector(".close-button");
  const modalContent = modal.querySelector(".modal-content");

  card.addEventListener("click", () => {
    modal.style.display = "block";
    setTimeout(() => {
      modal.style.opacity = "1";
      modalContent.style.animation = "slideDown 0.5s forwards";
    }, 50);
  });

  closeButton.addEventListener("click", () => {
    modalContent.style.animation = "slideUp 0.5s forwards";
    modal.style.opacity = "0";

    setTimeout(() => {
      modal.style.display = "none";
    }, 500);
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modalContent.style.animation = "slideUp 0.5s forwards";
      modal.style.opacity = "0";

      setTimeout(() => {
        modal.style.display = "none";
      }, 500);
    }
  });
}

setupModal("snake-game-card", "snake-game-modal");
setupModal("calculator-card", "calculator-modal");
setupModal("converter-card", "converter-modal");
setupModal("temp-card", "temp-modal");
setupModal("hms-card", "hms-modal");
setupModal("ecom-card", "ecom-modal");
setupModal("tdl-card", "tdl-modal");
setupModal("zomato-card", "zomato-modal");
