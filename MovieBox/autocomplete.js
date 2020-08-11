// This function will take a configuration object to create autocomplete acc. to this congif.
const createAutoComplete = ({ root, renderOptions }) => {
  root.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
    `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    //  make `resultWrapper` empty if there is a previous fetch.
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (const movie of movies) {
      const option = document.createElement("a");
      option.classList.add("dropdown-item");
      option.innerHTML = renderOptions(movie);

      option.addEventListener("click", () => {
        input.value = movie.Title;
        dropdown.classList.remove("is-active");
        onMovieSelect(movie);
      });
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) dropdown.classList.remove("is-active");
  });
};
