// DOM Elements
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.querySelector(".nav-menu")
const backToTop = document.querySelector(".back-to-top")
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-link")
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")
const contactForm = document.getElementById("contact-form")
const currentYear = document.getElementById("current-year")

// Set current year in footer
currentYear.textContent = new Date().getFullYear()

// Mobile Menu Toggle
mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")

  // Toggle hamburger animation
  const bars = mobileMenu.querySelectorAll(".bar")
  if (mobileMenu.classList.contains("active")) {
    bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
    bars[1].style.opacity = "0"
    bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
  } else {
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")

    // Reset hamburger
    const bars = mobileMenu.querySelectorAll(".bar")
    bars[0].style.transform = "none"
    bars[1].style.opacity = "1"
    bars[2].style.transform = "none"
  })
})

// Back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("active")
  } else {
    backToTop.classList.remove("active")
  }

  // Active nav link based on scroll position
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active")
    }
  })

  // Reveal animations on scroll
  revealOnScroll()
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    }
  })
})

// Portfolio filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const filterValue = btn.getAttribute("data-filter")

    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block"
        setTimeout(() => {
          item.style.opacity = "1"
          item.style.transform = "scale(1)"
        }, 200)
      } else {
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"
        setTimeout(() => {
          item.style.display = "none"
        }, 500)
      }
    })
  })
})

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Basic form validation
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    if (!name || !email || !subject || !message) {
      showFormMessage("Please fill in all fields", "error")
      return
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address", "error")
      return
    }

    // Simulate form submission (replace with actual form submission)
    const formData = {
      name,
      email,
      subject,
      message,
    }

    console.log("Form submitted:", formData)

    // Show success message
    showFormMessage("Your message has been sent successfully!", "success")

    // Reset form
    contactForm.reset()
  })
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Helper function to show form messages
function showFormMessage(message, type) {
  const formMessage = document.createElement("div")
  formMessage.className = `form-message ${type}`
  formMessage.textContent = message

  // Remove any existing messages
  const existingMessage = document.querySelector(".form-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  // Add message to the form
  contactForm.appendChild(formMessage)

  // Remove message after 5 seconds
  setTimeout(() => {
    formMessage.remove()
  }, 5000)
}

// Scroll reveal animation
function revealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")

  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("active")
    }
  })
}

// Initialize scroll reveal
window.addEventListener("load", () => {
  // Add reveal classes to elements
  document.querySelectorAll(".section-title").forEach((el) => el.classList.add("reveal"))
  document.querySelectorAll(".about-image").forEach((el) => el.classList.add("reveal-left"))
  document.querySelectorAll(".about-text").forEach((el) => el.classList.add("reveal-right"))
  document.querySelectorAll(".portfolio-item").forEach((el) => el.classList.add("reveal"))
  document.querySelectorAll(".skills-category").forEach((el) => el.classList.add("reveal"))
  document.querySelectorAll(".contact-info").forEach((el) => el.classList.add("reveal-left"))
  document.querySelectorAll(".contact-form-container").forEach((el) => el.classList.add("reveal-right"))

  // Trigger initial reveal
  revealOnScroll()
})

// Skill bar animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.style.width
    bar.style.width = "0"

    setTimeout(() => {
      bar.style.width = width
    }, 500)
  })
}

// Initialize skill bar animation when skills section is in view
const skillsSection = document.querySelector(".skills")
if (skillsSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  observer.observe(skillsSection)
}
