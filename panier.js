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
    const form = document.createElement("form");

    const email = document.createElement("input");
    email.placeholder = "email";
    const name = document.createElement("input");
    name.placeholder = "name";
    const address = document.createElement("input");
    address.placeholder = "address";

    email.classList.add(
        "appearance-none",
        "block",
        "w-full",
        "px-3",
        "py-2",
        "border",
        "border-gray-300",
        "rounded-md",
        "shadow-sm",
        "placeholder-gray-400",
        "focus:outline-none",
        "focus:ring-indigo-500",
        "focus:border-indigo-500",
        "sm:text-sm"
    );

    name.classList.add(
        "appearance-none",
        "block",
        "w-full",
        "px-3",
        "py-2",
        "border",
        "border-gray-300",
        "rounded-md",
        "shadow-sm",
        "placeholder-gray-400",
        "focus:outline-none",
        "focus:ring-indigo-500",
        "focus:border-indigo-500",
        "sm:text-sm"
    );

    address.classList.add(
        "appearance-none",
        "block",
        "w-full",
        "px-3",
        "py-2",
        "border",
        "border-gray-300",
        "rounded-md",
        "shadow-sm",
        "placeholder-gray-400",
        "focus:outline-none",
        "focus:ring-indigo-500",
        "focus:border-indigo-500",
        "sm:text-sm"
    );

    form.appendChild(email);
    form.appendChild(name);
    form.appendChild(address);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const transformedCart = cart.reduce((acc, item) => {
        // Find the item in the accumulator array
        const foundItem = acc.find((i) => i.id === item.id);

        if (foundItem) {
          // If the item is already in the accumulator, increment its amount
          foundItem.amount++;
        } else {
          // If the item is not in the accumulator, add it with an amount of 1
          acc.push({ id: item.id, amount: 1 });
        }

        return acc;
      }, []);

      
      const order = {
        email: email.value,
        name: name.value,
        address: address.value,
        cart: transformedCart,
      };
      
      console.log(order);

      await axios
        .post(`${apiUrl}/order/`, order)
        .then((response) => {
          console.log(response);
          alert("Order has been placed.");
          localStorage.removeItem("cart");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    const command = document.createElement("button");
    command.type = "submit";
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

    form.appendChild(command);
    panier.appendChild(form);

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
