const products = [
  {
    id: 1,
    title: "Premium Cotton T-Shirt",
    category: "men",
    price: 59.99,
    // White clean t-shirt
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Elegant Silk Dress",
    category: "women",
    price: 189.99,
    // Red elegant dress
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Leather Crossbody Bag",
    category: "accessories",
    price: 129.99,
    // Brown leather bag
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Classic Denim Jacket",
    category: "men",
    price: 99.99,
    // Men's denim jacket
    image:
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Floral Summer Blouse",
    category: "women",
    price: 79.99,
    // Floral top
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Minimalist Watch",
    category: "accessories",
    price: 249.99,
    // Clean wrist watch
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Wool Blend Sweater",
    category: "men",
    price: 119.99,
    // Cozy sweater
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "High-Waist Trousers",
    category: "women",
    price: 89.99,
    // Fashionable trousers
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Vintage Sunglasses",
    category: "accessories",
    price: 89.99,
    // Sunglasses
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Casual Polo Shirt",
    category: "men",
    price: 69.99,
    // Men's Polo
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Designer Blazer",
    category: "women",
    price: 159.99,
    // Women's Blazer
    image:
      "https://images.unsplash.com/photo-1548624150-f3b1eb1974e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Premium Backpack",
    category: "accessories",
    price: 149.99,
    // Leather Backpack
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
];

// Card Functionality
let cart = [];

let currentPaymentMethod = "credit";

function renderProducts(productToRender = products) {
  const grid = document.getElementById("productGrid");

  grid.innerHTML = productToRender
    .map((product) => {
      const isSale = Math.random() > 0.7;
      const oldPrice = isSale ? (product.price * 1.2).toFixed(2) : null;

      return `
    <div class="product-card" data-category="${product.category}">
      <div style="position: relative">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="product-image"
        />${isSale ? '<span class="sale-badge">SALE</span>' : ""}
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-category">
          ${
            product.category.charAt(0).toUpperCase() + product.category.slice(1)
          }
        </p>
        <div class="product-price">
          ${
            isSale ? `<span class="old-price">Rs. ${oldPrice}</span>` : ""
          } Rs. ${product.price}
        </div>
        <button class="add-to-cart" onclick="addToCart('${product.id}', this)">
            Add to Cart
        </button>
      </div>
    </div>`;
    })
    .join("");
}

function filterProducts(category) {
  // Update active Filter button
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  //   Filter Products
  const filterProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);
  renderProducts(filterProducts);
}

function addToCart(productId, buttonElement) {
  const product = products.find((p) => p.id == productId);
  const existingItem = cart.find((item) => item.id == productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  renderCart();

  //   Show success feedback
  const originalText = buttonElement.textContent;
  buttonElement.textContent = "✓ Added!";
  buttonElement.style.background = "#34c759";
  setTimeout(() => {
    buttonElement.textContent = originalText;
    buttonElement.style.background = "transparent";
    buttonElement.style.color = "#000";
  }, 1000);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  renderCart();
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartCount();
      renderCart();
    }
  }
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cartCount").textContent = count;
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartItems.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <p>Your Cart is empty.</p>
        </div>
    `;
    cartTotal.style.display = "none";
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
        item.title
      }" class="cart-item-image" />
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${
                              item.id
                            }, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>

                            <button class="quantity-btn" onclick="updateQuantity(${
                              item.id
                            }, 1)">+</button>
                        </div>
                    </div>
                </div>
                `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").textContent = `Total : ${total.toFixed(
    2
  )}`;

  document.getElementById(
    "checkoutTotal"
  ).textContent = `Total : ${total.toFixed(2)}`;

  cartTotal.style.display = "block";
}

function toggleCart() {
  const modal = document.getElementById("cartModal");
  if (modal.style.display === "block") {
    modal.classList.remove("active");
    setTimeout(() => {
      modal.style.display = "none";
    }, 400);
  } else {
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("active");
    }, 10);
  }
  //   Hide checkout form when opening cart
  hideCheckout();
}

function showCheckout() {
  if (cart.length === 0) return;

  document.getElementById("cartItems").style.display = "none";
  document.getElementById("cartTotal").style.display = "none";
  document.getElementById("checkoutForm").classList.add("active");
}

function hideCheckout() {
  document.getElementById("cartItems").style.display = "block";
  document.getElementById("cartTotal").style.display = "block";
  document.getElementById("checkoutForm").classList.remove("active");
}

function selectPayment(method) {
  currentPaymentMethod = method;
  document
    .querySelectorAll(".payment-method")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  const creditCardForm = document.getElementById("creditCardForm");
  if (method === "credit") {
    creditCardForm.style.display = "block";
  } else {
    creditCardForm.style.display = "none";
  }
}

function processOrder(event) {
  event.preventDefault();

  if (cart.length === 0) return;

  //   Get Form Data
  const formData = new FormData(event.target);

  const orderData = {
    item: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    customer: {
      name: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    },

    shipping: {
      address: formData.get("address"),
      city: formData.get("city"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
    },

    payment: {
      method: currentPaymentMethod,
    },
  };

  //   Stimulateorder processing
  const placeOrderBtn = document.querySelector(".place-order-btn");
  placeOrderBtn.textContent = "🔄 Processing...";
  placeOrderBtn.disabled = true;

  setTimeout(() => {
    alert(
      `🎉 Order placed successfully!\n\nOrder Details:\n- Items: ${
        cart.length
      }\n- Total: ${orderData.total.toFixed(2)}\n- Delivery to: ${
        orderData.customer.name
      }\n\nThank you for shopping with Sanskar Fashion!`
    );

    // Reset Everything
    cart = [];
    updateCartCount();
    renderCart();
    toggleCart();
    event.target.reset();

    placeOrderBtn.textContent = "🚀 Place Order";
    placeOrderBtn.disabled = false;
  }, 2000);
}

// Format Card number input
document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("cardNumber");
  const expiryInput = document.getElementById("expiryDate");
  const cvvInput = document.getElementById("cvv");

  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
      let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
      e.target.value = formattedValue;
    });
  }

  if (expiryInput) {
    expiryInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      e.target.value = value;
    });
  }

  if (cvvInput) {
    cvvInput.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "").substring(0, 4);
    });
  }
});

// Close Cart when clicking outside
document.getElementById("cartModal").addEventListener("click", function (e) {
  if (e.target === this) {
    toggleCart();
  }
});

function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  updateCartCount();
});
