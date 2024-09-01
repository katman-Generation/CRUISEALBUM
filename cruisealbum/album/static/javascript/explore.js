function openNavigation() {
  document.getElementsByClassName("navigation").style.width = "100%";
  document.getElementsByClassName("closebtn").style.display = "true";
}

/* Close/hide the sidenav */
function closeNavigation() {
  document.getElementsByClassName("navigation").style.width = "0";
  document.getElementsByClassName("closebtn").style.display = "none";
}