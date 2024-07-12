function displayContent(fileName) {
    window.location.href = `/details?fileName=${encodeURIComponent(fileName)}`;
}