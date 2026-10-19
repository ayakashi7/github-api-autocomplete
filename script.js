const input = document.querySelector("#gnomik");
const autocomplete = document.querySelector("#autocomplete");
const repoList = document.querySelector("#repo-list");

// DEBOUNS
const debounce = (fn, debounceTime = 0) => {
  let timerId = null;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Данные:", data);
  });

// VUPAD MENU
function renderAutocomplete(items) {
  autocomplete.innerHTML = "";

  if (!items || items.length === 0) {
    autocomplete.style.display = "none";
    return;
  }

  items.slice(0, 5).forEach((repo) => {
    const li = document.createElement("li");
    li.textContent = repo.name;

    li.addEventListener("click", () => {
      addRepoToList(repo);
      input.value = "";
      autocomplete.innerHTML = "";
      autocomplete.style.display = "none";
    });

    autocomplete.appendChild(li);
  });

  autocomplete.style.display = "block";
}

// v niz paidosh
function addRepoToList(repo) {
  const li = document.createElement("li");

  // text,info
  const textSpan = document.createElement("span");
  textSpan.textContent = `Name: ${repo.name} | Owner: ${repo.owner.login} | Stars: ${repo.stargazers_count}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "\u2716";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(textSpan);
  li.appendChild(deleteBtn);
  repoList.appendChild(li);
}

const debouncedFetch = debounce((query) => {
  if (!query.trim()) {
    autocomplete.innerHTML = "";
    autocomplete.style.display = "none";
    return;
  }
  fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=5`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Данные:", data);
      renderAutocomplete(data.items);
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
}, 500);

// vodila
input.addEventListener("input", (e) => {
  const query = e.target.value;
  console.log(query);

  debouncedFetch(query);
});

// zacrut
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-gold")) {
    autocomplete.innerHTML = "";
    autocomplete.style.display = "none";
  }
});
