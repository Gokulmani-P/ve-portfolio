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

// VIDEO MODAL SCRIPT
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeVideoModal = document.getElementById("closeVideoModal");

// Open modal when play button is clicked
document.querySelectorAll(".card .play-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        e.stopPropagation(); // prevent card click if needed
        const card = e.target.closest(".work-video");
        const videoSrc = card.getAttribute("data-video");
        modalVideo.src = videoSrc;
        videoModal.classList.add("active");
    });
});

// Close modal
closeVideoModal.addEventListener("click", () => {
    videoModal.classList.remove("active");
    modalVideo.pause();
    modalVideo.src = "";
});

// Close modal when clicking outside video
videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove("active");
        modalVideo.pause();
        modalVideo.src = "";
    }
});



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
