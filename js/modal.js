function openModal(src) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("imgFull").src = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") closeModal();
});