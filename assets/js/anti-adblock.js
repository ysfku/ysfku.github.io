document.addEventListener('DOMContentLoaded', function () {
<<<<<<< HEAD
    var adblockDetected = false;
    
    // Elemen yang umumnya diblokir oleh adblocker
    var ad = document.createElement('div');
    ad.innerHTML = '&nbsp;';
    ad.className = 'adsbox';
    document.body.appendChild(ad);
    
    // Periksa apakah elemen iklan diblokir
    window.setTimeout(function() {
        if (ad.offsetHeight === 0) {
            adblockDetected = true;
            document.body.innerHTML = '<div style="text-align: center; margin-top: 50px;"><h1>Please disable your adblocker to view this site.</h1></div>';
        } else {
            adblockDetected = false;
            document.getElementById('content').style.display = 'block';
        }
        document.body.removeChild(ad);
    }, 100);
=======
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
>>>>>>> origin/main
});

