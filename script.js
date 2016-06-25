(function () {
    var scroll = function () {
        var head = document.querySelector('#header');
        var page = document.querySelector('#page_container');
        var side = document.querySelector('#sidemenu');
        var cont = document.querySelector('#content-wrapper');
        if(window.scrollY > 0) {
            head.classList.add('fixed');
            side.classList.add('fixed-sidemenu');
        }
        else {
            head.classList.remove('fixed');
            side.classList.remove('fixed-sidemenu');
        }
    };
    var timer;
    window.addEventListener('scroll', function() {
        if (timer == null) {
            scroll();
            timer = window.setTimeout(function() {
                timer = null;
                scroll();
            }, 200);
        }
    });
})();

function myFunction() {
    document.getElementsByClassName("topmenu")[0].classList.toggle("responsive");
}