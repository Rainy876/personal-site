const checkbox = document.getElementById("checkbox");
var x = document.getElementById("toucan");
x.style.display = "none";
function checkboxChange() {
    
    if (x.style.display == "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}