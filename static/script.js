(function () {
    var scroll = function () {
        var head = document.querySelector('#topnav');
        var side = document.querySelector('#sidemenu');
        var button = document.querySelector('#backtotop-button');
        if(window.pageYOffset  > 0){            
            button.classList.remove('hidden');
        }
        else {            
            button.classList.add('hidden');
        }
        if(window.scrollY > 126) {
            head.classList.add('fixed-topnav');
            side.classList.add('fixed-sidemenu');
            side.classList.remove('absolute-sidemenu');
        }
        else {
            head.classList.remove('fixed-topnav');
            side.classList.remove('fixed-sidemenu');
            side.classList.add('absolute-sidemenu');
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
