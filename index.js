document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.kedufront.juniortaker.com";
  const main = document.getElementById("main");
  main.classList.add("grid", "grid-cols-3", "gap-4", "p-4");

  (async () => {
    await axios
      .get(`${apiUrl}/item/`)
      .then((response) => {
        const items = response.data;
        console.log(items);

        for (let item in items) {
          const a = document.createElement("a");
          const div = document.createElement("div");

          a.href = `article?id=${items[item]._id}`;

          div.classList.add(
            "transition",
            "transform",
            "duration-500",
            "ease-in-out",
            "hover:scale-105",
            "bg-white",
            "shadow",
            "rounded",
            "p-6",
            "cursor-pointer"
          );
          div.innerHTML = `
            <img class="w-full h-64 object-contain mb-4 rounded" src="${apiUrl}/static/img/${items[item]._id}.png"></img>
            <h1 class="text-xl mb-2">${items[item].name}</h1>
            <p class="text-gray-700 mb-2">${items[item].price} €</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none" id="btn${items[item]._id}">Add to cart</button>
          `;
          div.querySelector("button").addEventListener("click", function (event) {
              event.preventDefault();

              // Create a cart item
              const cartItem = {
                id: items[item]._id,
                name: items[item].name,
                price: items[item].price,
              };

              // Get the current cart from localStorage
              let cart = JSON.parse(localStorage.getItem("cart")) || [];

              // Add the new item to the cart
              cart.push(cartItem);


              // Save the updated cart back to localStorage
              localStorage.setItem("cart", JSON.stringify(cart));

              alert("Item has been added to the cart.");
            });
          a.appendChild(div);
          main.appendChild(a);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  })();
});
