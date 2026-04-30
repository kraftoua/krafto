import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Твоя конфігурація Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2vUVszawPHKhURHBrOg2OCRiAJfYokLg",
  authDomain: "krafto-f0be7.firebaseapp.com",
  projectId: "krafto-f0be7",
  storageBucket: "krafto-f0be7.appspot.com",
  messagingSenderId: "646333185483",
  appId: "1:646333185483:web:0bf51d6db7c61507d1ca4e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    
    // Очищуємо всі сітки перед завантаженням (щоб не було дублів)
    document.querySelectorAll('.product-grid').forEach(grid => grid.innerHTML = "");

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      const productId = doc.id; 
      
      // 1. Обробка картинки: беремо першу, якщо їх кілька, і прибираємо зайві пробіли
      const allImages = item.image.split(',');
      const firstImage = allImages[0].trim();
      
      const categorySection = document.getElementById(item.category);
      
      if (categorySection) {
        const grid = categorySection.querySelector('.product-grid');
        if (grid) {
          // Використовуємо insertAdjacentHTML для надійності
          const productCard = `
            <a href="product.html?id=${productId}" class="product-link" style="text-decoration: none; color: inherit;">
              <div class="product-card">
                <div class="product-img-container">
                  <img src="${firstImage}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/300?text=Фото+недоступне'">
                </div>
                <div class="product-info">
                  <h3>${item.name}</h3>
                  <p class="price">${item.price} грн/100г</p>
                </div>
              </div>
            </a>`;
          
          grid.insertAdjacentHTML('beforeend', productCard);
        }
      }
    });
  } catch (error) {
    console.error("Помилка завантаження товарів:", error);
  }
}

// Запускаємо завантаження
loadProducts();