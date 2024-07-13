function displayContent(fileName) {
    window.location.href = `/details?fileName=${encodeURIComponent(fileName)}`;
    console.log("clicked:" + fileName)
}