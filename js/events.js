(function () {
    var $toggle = document.querySelector("[data-js='toggle']");
    $toggle.addEventListener("click", function () {
        document.querySelector("[data-js='shop']").classList.toggle("navbar-simulator-active")
        document.querySelector("[data-js='bottomMenu']").classList.toggle("bottom-detail-active")
    }, false);

}());
