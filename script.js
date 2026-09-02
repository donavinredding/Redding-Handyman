document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Copyright Year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Mobile Navigation Menu Toggle
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
            });
        });
    }

    // 3. Multi-Image Lightbox Gallery Functionality
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    let currentImages = [];
    let currentIndex = 0;
    let currentTitle = "";

    if (lightbox) {
        // Create Single Set of Navigation Buttons attached directly to #lightbox
        let prevBtn = document.getElementById("lightboxPrev");
        let nextBtn = document.getElementById("lightboxNext");

        if (!prevBtn) {
            prevBtn = document.createElement("button");
            prevBtn.id = "lightboxPrev";
            prevBtn.className = "lightbox-nav lightbox-prev";
            prevBtn.innerHTML = "&#10094;";
            prevBtn.setAttribute("aria-label", "Previous Image");
            lightbox.appendChild(prevBtn);
        }

        if (!nextBtn) {
            nextBtn = document.createElement("button");
            nextBtn.id = "lightboxNext";
            nextBtn.className = "lightbox-nav lightbox-next";
            nextBtn.innerHTML = "&#10095;";
            nextBtn.setAttribute("aria-label", "Next Image");
            lightbox.appendChild(nextBtn);
        }

        // Attach Card Click Handlers
        const portfolioCards = document.querySelectorAll(".portfolio-card");
        portfolioCards.forEach(card => {
            card.addEventListener("click", () => {
                const srcData = card.getAttribute("data-src");
                currentTitle = card.getAttribute("data-title") || "";

                if (srcData) {
                    currentImages = srcData.split(",").map(url => url.trim());
                    currentIndex = 0;
                    updateLightboxDisplay();
                    lightbox.classList.add("active");
                }
            });
        });

        // Update Image & Caption View
        function updateLightboxDisplay() {
            lightboxImg.src = currentImages[currentIndex];

            if (currentImages.length > 1) {
                prevBtn.style.display = "flex";
                nextBtn.style.display = "flex";
                lightboxCaption.textContent = `${currentTitle} (${currentIndex + 1}/${currentImages.length})`;
            } else {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
                lightboxCaption.textContent = currentTitle;
            }
        }

        // Navigation Click Handlers
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            updateLightboxDisplay();
        });

        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentImages.length;
            updateLightboxDisplay();
        });

        // Keyboard Navigation
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;

            if (e.key === "Escape") {
                closeLightbox();
            } else if (e.key === "ArrowLeft" && currentImages.length > 1) {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                updateLightboxDisplay();
            } else if (e.key === "ArrowRight" && currentImages.length > 1) {
                currentIndex = (currentIndex + 1) % currentImages.length;
                updateLightboxDisplay();
            }
        });

        // Close Modal Handlers
        function closeLightbox() {
            lightbox.classList.remove("active");
            lightboxImg.src = "";
            currentImages = [];
            currentIndex = 0;
        }

        lightboxClose?.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 4. Contact Form Submission
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for reaching out! We will contact you shortly regarding your estimate.");
            contactForm.reset();
        });
    }
});