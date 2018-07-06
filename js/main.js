let titleTextbox = document.getElementById("titleTextbox");
let checkmark = document.getElementById("checkmarkIconButton");
let xButton = document.getElementById("xIconButton");
let h1 = document.querySelector("h1");
let editBox = document.getElementById("editBox");
let slugsArray = [];
let currentSlug = "";

//open edit mode
document
  .getElementById("pencilIconButton")
  .addEventListener("click", editTitle);

//discard text
xButton.addEventListener("click", discardTitle);

//submit text
checkmark.addEventListener("click", submitTitle);

//when user starts typing, check if titleTextbox is not empty and generate slug
titleTextbox.addEventListener("keyup", function() {
  checkTitle();
  generateSlug();
});

//get text from current title and add it to textbox for editing, hide h1
function editTitle() {
  let currentTitle = document.querySelector(".textClipSpan").innerHTML;
  h1.style.display = "none";
  titleTextbox.value = currentTitle;
  editBox.style.display = "block";
  titleTextbox.focus();
  checkmark.style.display = "block";
  xButton.style.display = "block";
}

//discard text from textbox. gray out checkmark. remove event listener from checkmark
function discardTitle() {
  titleTextbox.value = "";
  titleTextbox.focus();
  checkmark.style.backgroundColor = "#4d4d4d";
  //remove submit event listener
  checkmark.removeEventListener("click", submitTitle);
  generateSlug();
}

//after text is submitted, hide edit icons, show h1
function submitTitle() {
  if (titleTextbox.value.length < 1) {
    return;
  } else {
    editBox.style.display = "none";
    document.querySelector("h1 .textClipSpan").innerHTML = titleTextbox.value;
    h1.style.display = "block";
    currentSlug = string_to_slug(titleTextbox.value);
    addSlug();
  }
}

//add slug to slugsArray
function addSlug() {
  //if slug is not found in slugsArray, add it
  if (slugsArray.indexOf(currentSlug) == -1) {
    slugsArray.push(currentSlug);
  } else {
    currentSlug = currentSlug + "-" + randomString();
    slugsArray.push(currentSlug);
  }
  updateSlug();
  console.log(slugsArray);
}

//check if textbox has any text, change checkmark to green and
//add addEventListener to checkmark to submit title
function checkTitle() {
  if (titleTextbox.value.length > 1) {
    checkmark.style.backgroundColor = "#a2d05a";
    checkmark.addEventListener("click", submitTitle);
  }
}

function generateSlug() {
  if (titleTextbox.value < 1) {
    currentSlug = "please enter a post title";
  } else {
    currentSlug = string_to_slug(titleTextbox.value);
    //check if slug exists in the slugsArray, then add 5 random digits
    if (slugsArray.indexOf(currentSlug) !== -1) {
      currentSlug = currentSlug + "-" + randomString();
    }
  }
  updateSlug();
}

function updateSlug() {
  document.getElementById("slugName").innerHTML = currentSlug;
}

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

function randomString() {
  return (Math.random() + 1).toString(36).substr(2, 5);
}
