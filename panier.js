document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const apiUrl = "https://api.kedufront.juniortaker.com";

  console.log(cart);

  const panier = document.getElementById("panier");

  panier.classList.add("grid", "grid-cols-1", "gap-4", "p-4");

  if (cart.length === 0) {
    panier.innerHTML = "<p>Panier vide</p>";
  } else {
    let total = 0;
    for (let item in cart) {
      total += cart[item].price;
      const div = document.createElement("div");
      div.classList.add("bg-white", "shadow", "rounded", "p-6");
      div.innerHTML = `
        <img class="w-full h-64 object-contain mb-4 rounded" src="${apiUrl}/static/img/${cart[item].id}.png"></img>
        <h1 class="text-xl mb-2">${cart[item].name}</h1>
        <p class="text-gray-700 mb-2">${cart[item].price} €</p>
        <i class="fas fa-trash-alt text-red-500 cursor-pointer" id="trash${cart[item].id}"></i>
      `;

      div.querySelector("i").addEventListener("click", function (event) {
        event.preventDefault();

        cart = cart.filter((item) => item.id !== cart[item].id);

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Item has been removed from the cart.");

        window.location.reload();
      });
      panier.appendChild(div);
    }
    const command = document.createElement("button");
    command.classList.add(
      "bg-blue-500",
      "hover:bg-blue-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "focus:outline-none"
    );
    command.innerHTML = "Commander";

    panier.appendChild(command);

    const clear = document.createElement("button");
    clear.classList.add(
      "bg-red-500",
      "hover:bg-red-700",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "focus:outline-none"
    );
    clear.innerHTML = "Vider le panier";

    clear.addEventListener("click", function (event) {
      event.preventDefault();

      localStorage.removeItem("cart");

      alert("Le panier a été vidé.");

      window.location.reload();
    });

    panier.appendChild(clear);
  }
});
