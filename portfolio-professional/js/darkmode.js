// DOM Elements
const themeSwitch = document.getElementById("checkbox")
const body = document.body

// Check for saved theme preference or use preferred color scheme
const currentTheme =
  localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

// Apply the saved theme or default
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark")
  themeSwitch.checked = true
}

// Theme switch event listener
themeSwitch.addEventListener("change", function () {
  if (this.checked) {
    body.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  } else {
    body.removeAttribute("data-theme")
    localStorage.setItem("theme", "light")
  }

  // Add transition effect
  body.classList.add("theme-transition")
  setTimeout(() => {
    body.classList.remove("theme-transition")
  }, 1000)
})

// Add theme transition class
document.documentElement.style.setProperty("--transition-theme", "background-color 0.4s ease, color 0.4s ease")

// Detect system theme preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  const newTheme = e.matches ? "dark" : "light"

  // Only change if user hasn't manually set a preference
  if (!localStorage.getItem("theme")) {
    if (newTheme === "dark") {
      body.setAttribute("data-theme", "dark")
      themeSwitch.checked = true
    } else {
      body.removeAttribute("data-theme")
      themeSwitch.checked = false
    }
  }
})
