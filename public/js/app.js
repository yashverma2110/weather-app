const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  var loc = document.getElementById("address");
  var data = document.getElementById("forecast");
  data.innerHTML = "";
  data.appendChild(document.createTextNode("Loading..."));
  fetch(`http://localhost:3000/weather?address=${loc.value}`)
    .then((res) =>
      res.json().then((data) => {
        var tag = document.getElementById("forecast");
        tag.innerHTML = "";
        tag.appendChild(document.createTextNode(data.forecast));
      })
    )
    .catch((err) => console.log(err));
  loc.value = "";
});
