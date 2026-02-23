// NAVIGATION & SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");
const headerHeight = document.querySelector("header").offsetHeight;

navLinks.forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        const sectionPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({ top: sectionPosition, behavior: "smooth" });
        navLinks.forEach(l => l.classList.remove("active"));
        this.classList.add("active");
    });
});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionHeight = section.offsetHeight;
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight){
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
});

// MOBILE MENU TOGGLE
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("active"));
/* ================= CLEAN PROFESSIONAL VIDEO OVERLAY ================= */

const worksCards = document.querySelectorAll("#works .work-video");
const overlay = document.getElementById("videoOverlay");
const overlayVideo = document.getElementById("overlayVideo");

worksCards.forEach(card => {
    const button = card.querySelector(".play-btn");
    const videoSrc = card.getAttribute("data-video");

    button.addEventListener("click", () => {
        overlayVideo.src = videoSrc;
        overlayVideo.play();

        if (card.closest(".works-shorts")) {
            overlay.classList.add("portrait");
            overlay.classList.remove("landscape");
        } else {
            overlay.classList.add("landscape");
            overlay.classList.remove("portrait");
        }

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
});

/* Close when clicking background */
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        closeVideo();
    }
});

/* Auto close when finished */
overlayVideo.addEventListener("ended", () => {
    closeVideo();
});

function closeVideo() {
    overlay.classList.remove("active", "portrait", "landscape");
    overlayVideo.pause();
    overlayVideo.src = "";
    document.body.style.overflow = "auto";
}


/* ===== COURSE IMAGE POPUP FIX ===== */

const courseImgs = document.querySelectorAll("#courses .card img");
const popup = document.getElementById("coursePopup");
const popupImg = document.getElementById("popupImage");

courseImgs.forEach(img => {
    img.addEventListener("click", () => {
        popup.classList.add("active");
        popupImg.src = img.src;
        document.body.style.overflow = "hidden";
    });
});

popup.addEventListener("click", () => {
    popup.classList.remove("active");
    popupImg.src = "";
    document.body.style.overflow = "auto";
});
