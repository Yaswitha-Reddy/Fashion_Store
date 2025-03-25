
        const products = [
            {
                id: 1,
                name: "Italian Wool Suit",
                price: 899.99,
                image: "https://images.unsplash.com/photo-1592878940526-0214b0f374f6",
                category: "men",
                description: "Luxurious Italian wool suit in charcoal grey"
            },
            {
                id: 2,
                name: "Silk Evening Gown",
                price: 1299.99,
                image: "https://i.pinimg.com/originals/d8/61/d2/d861d247952e9178b87c722828c4b029.png",
                category: "women",
                description: "Elegant silk evening gown in deep burgundy"
            },
            {
                id: 3,
                name: "Leather Oxford Shoes",
                price: 459.99,
                image: "https://d2kcmm46z5hz8u.cloudfront.net/image/cache/catalog/2019mensshoes2/brown-lace-up-dapper-mens-oxfords-loafers-dress-shoes-zvoof-a12672-1000x1000.jpg",
                category: "shoes",
                description: "Hand-crafted Italian leather oxford shoes"
            },
            {
                id: 4,
                name: "Cashmere Sweater",
                price: 299.99,
                image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
                category: "men",
                description: "Pure cashmere sweater in cream"
            },
            {
                id: 5,
                name: "Designer Handbag",
                price: 1899.99,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
                category: "women",
                description: "Luxury leather handbag with gold hardware"
            },
            {
                id: 6,
                name: "Designer Heels",
                price: 699.99,
                image: "https://www.loveandlavender.com/wp-content/uploads/2015/03/wedding-day-114.jpg",
                category: "shoes",
                description: "Luxury designer heels in black"
            }
        ];

        let currentUser = null;
        let cart = [];
        let currentCategory = 'all';

        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.style.display = 'none';
            });
            document.getElementById(pageId + 'Page').style.display = 
                pageId === 'home' ? 'block' : 'flex';
        }

        function renderProducts() {
            const productGrid = document.getElementById('productGrid');
            const filteredProducts = currentCategory === 'all' 
                ? products 
                : products.filter(p => p.category === currentCategory);

            productGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name luxury-font">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function toggleCart() {
            const cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.toggle('open');
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ productId, quantity: 1 });
            }

            updateCart();
            toggleCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const cartCount = document.querySelector('.nav-link:last-child');

            const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = `Cart (${totalQuantity})`;

            if (cart.length === 0) {
                cartItems.innerHTML = '<p style="text-align: center; color: #4a5568;">Your cart is empty</p>';
                cartTotal.textContent = '$0.00';
                return;
            }

            let total = 0;
            cartItems.innerHTML = cart.map(item => {
                const product = products.find(p => p.id === item.productId);
                total += product.price * item.quantity;

                return `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4 class="cart-item-name">${product.name}</h4>
                            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem;">
                                <button onclick="updateQuantity(${product.id}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity(${product.id}, 1)">+</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            cartTotal.textContent = `$${total.toFixed(2)}`;
        }

        function updateQuantity(productId, delta) {
            const item = cart.find(item => item.productId === productId);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    cart = cart.filter(item => item.productId !== productId);
                }
                updateCart();
            }
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple login simulation
            currentUser = { email, name: email.split('@')[0] };
            showPage('home');
            updateNavigation();
        }

        function handleSignup(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            // Simple signup simulation
            currentUser = { email, name };
            showPage('home');
            updateNavigation();
        }

        function updateNavigation() {
            const navLinks = document.querySelector('.nav-links');
            if (currentUser) {
                navLinks.innerHTML = `
                    <a href="#" class="nav-link">Welcome, ${currentUser.name}</a>
                    <a href="#" class="nav-link" onclick="logout()">Logout</a>
                    <button class="nav-link" onclick="toggleCart()">Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})</button>
                `;
            } else {
                navLinks.innerHTML = `
                    <a href="#" class="nav-link" onclick="showPage('home')">Shop</a>
                    <a href="#" class="nav-link" onclick="showPage('login')">Login</a>
                    <a href="#" class="nav-link" onclick="showPage('signup')">Sign Up</a>
                    <button class="nav-link" onclick="toggleCart()">Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})</button>
                `;
            }
        }

        function logout() {
            currentUser = null;
            updateNavigation();
            showPage('login');
        }

        function checkout() {
            if (!currentUser) {
                alert('Please login to checkout');
                toggleCart();
                showPage('login');
                return;
            }
            alert('Thank you for your purchase!');
            cart = [];
            updateCart();
            toggleCart();
        }

        // Event listeners for category buttons
        document.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                currentCategory = button.dataset.category;
                renderProducts();
            });
        });

        showPage('home');
        renderProducts();
        updateCart();
        updateNavigation();
    