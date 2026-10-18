const input = document.querySelector("#gnomik");

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Данные:", data);
  });

input.addEventListener("input", (e) => {
  console.log(e.target.value);

  fetch("https://api.github.com/search/repositories?q=" + e.target.value)
    .then((response) => response.json())
    .then((data) => {
      console.log("Данные:", data);
    });
});
// console.log(input);
