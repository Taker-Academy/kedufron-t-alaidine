document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.kedufront.juniortaker.com";
  const main = document.getElementById("main");

  const section = document.createElement("section");
  section.classList.add("grid", "grid-cols-3", "gap-4", "p-4");
  main.appendChild(section);

  (async () => {
    await axios
      .get(`${apiUrl}/item/`)
      .then((response) => {
        const items = response.data;
        console.log(items);

        for (let item in items) {
          const div = document.createElement("div");

          div.innerHTML = `
          <a href="/article.html?id">
            <div class="item bg-white shadow rounded p-6">
              <img class="w-full h-64 object-cover mb-4 rounded" src="${
                apiUrl
              }/static/img/${items[item].image}.png"></img>
              <h1 class="text-xl mb-2">${items[item].name}</h1>
              <p class="text-gray-700 mb-2">${items[item].price} €</p>
              <a hfre="/">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn${
                  item
                }">Add to cart</button>
              </a>
            </div>
          </a>
          `;
          section.appendChild(div);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })();
});
