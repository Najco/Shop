document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Laptop",
      price: 899,
      image:
        "https://www.jbhifi.com.au/cdn/shop/files/749929-Product-0-I-638518544407964431.jpg?v=1718771855",
    },
    {
      name: "Telefon",
      price: 499,
      image:
        "https://sbb.rs/wp-content/uploads/2024/05/sbb-5g-mobilni-telefon-front.png",
    },
    {
      name: "Slusalice",
      price: 99,
      image:
        "https://optilux.rs/media/catalog/product/cache/0d6c5c25f8baac92d2b1abf9ec1e290f/o/p/opus.jpg",
    },
    {
      name: "Televizor",
      price: 1299,
      image:
        "https://www.market.metalac.com/UserFiles/products/details/xiaomi-televizor-ela4584euled-43uhdsmartandroidcrna.jpg", // Skraceno
    },
    {
      name: "Sat",
      price: 199,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrE_SRGBEupqyCwtAuJr4Ja_o1RNNeoaxCcw&s", // Skraceno
    },
  ];

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cartList");
  const totalAmount = document.getElementById("totalAmount");
  const cartCount = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-3", "mb-3");
    card.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}</p>
                    <button class="btn btn-primary mt-auto" onclick="addToCart(${index})">Dodaj u korpu</button>
                </div>
            </div>
    
    `;
    productList.appendChild(card);
  });

  window.addToCart = function (index) {
    const product = products[index];

    const existingItem = cart.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    updateCart();
    showNotification(`${product.name} data u korpu`, "success");
    s;
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    updateCart();
    showNotification("Artlikal uspesno izbrisan", "warning");
  };

  window.changeQty = function (index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    updateCart();
  };

  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      showNotification("Korpa je prazna !", "error");
    } else {
      showNotification("Kupovina je zavrsena! Hvala!", "success");
      cart = [];
      updateCart();
    }
  });

  clearCartBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
    showNotification("Korpa je ispraznjena", "warning");
  });

  function updateCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      const li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      li.innerHTML = `
        ${item.name} - ${item.price} X ${item.qty}

        <div>
            <button class="btn btn-sm btn-secondary" onclick="changeQty(${index}, -1)">-</button>
            <button class="btn btn-sm btn-secondary" onclick="changeQty(${index}, 1)">+</button>
            <button class="btn btn-sm btn-danger" onclick="changeQty(${index})">🗑️</button>
        </div>
      `;

      cartList.appendChild(li);
    });
    totalAmount.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

  function showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    const notification = document.createElement("div");
    notification.classList.add("notification", type);
    notification.innerText = message;
    container.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 500);
    }, 3500);
  }
});
