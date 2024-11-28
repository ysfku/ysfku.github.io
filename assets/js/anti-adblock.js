document.addEventListener('DOMContentLoaded', function () {
    function checkAdblock() {
        if (typeof adblock === 'undefined') {
            document.body.innerHTML = '<div style="text-align: center; margin-top: 50px;"><h1>Please disable your adblocker to view this site.</h1></div>';
        } else {
            location.reload();
        }
    }
    
    checkAdblock();
    
    // Cek lagi setelah beberapa detik, untuk melihat apakah adblocker sudah dinonaktifkan
    setInterval(checkAdblock, 3000);
});
