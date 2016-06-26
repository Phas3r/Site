
//DB content wrapping
var wrappers = document.getElementsByClassName("wrapper");
var i;

for (i = 0; i < wrappers.length; i++) {
    wrappers[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}
