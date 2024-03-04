document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get("id");
  const article = document.getElementById("article");

  (async () => {
    await axios
      .get(`https://api.kedufront.juniortaker.com/item/${itemId}`)
      .then((response) => {
        const item = response.data.item;
        console.log(item);

        const div = document.createElement("div");
        div.classList.add("bg-white", "shadow", "rounded", "p-6");
        div.innerHTML = `
          <img class="w-full h-64 object-contain mb-4 rounded" src="https://api.kedufront.juniortaker.com/static/img/${itemId}.png"></img>
          <h1 class="text-xl mb-2">${item.name}</h1>
          <p class="text-gray-700 mb-2">${item.price} €</p>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" id="btn${itemId}">Add to cart</button>
        `;
        div.querySelector("button").addEventListener("click", function (event) {
          event.preventDefault();

          // Céer un item de panier
          const cartItem = {
            id: itemId,
            name: item.name,
            price: item.price,
          };

          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          cart.push(cartItem);

          localStorage.setItem("cart", JSON.stringify(cart));

          alert("Item has been added to the cart.");
        });
        article.appendChild(div);
      })
      .catch((error) => {
        console.log(error);
      });
  })();
});
