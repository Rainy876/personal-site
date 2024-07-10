const checkbox = document.getElementById("checkbox");

function checkboxChange() {
    let checked = checkbox.checked;
    console.log(`The checkbox has this state: ${checked}`);

    if (checked) {
        <img src="images/animals_hero_toucan.png" alt="TOUCAN!!" style="width: auto; height: auto;"></img>
        body.style.outlineStyle = 'solid';
    } else {
        body.style.outlineStyle ='none';
    }
}