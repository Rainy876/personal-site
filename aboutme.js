const checkbox = document.getElementById("checkbox");

function checkboxChange() {
    var x = document.getElementById("toucan");
    if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
}