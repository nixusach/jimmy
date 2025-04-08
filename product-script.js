let counter = 1;

document.getElementById("add-more").addEventListener("click", function () {
    counter++;
    let container = document.getElementById("selection-container");
    let newRow = document.createElement("div");
    newRow.classList.add("selection-row");

    const colorId = `color-select-${counter}`;
    const sizeId = `size-select-${counter}`;
    const qtyId = `quantity-${counter}`;
    
    // Check if mobile view
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const productNum = isMobile ? ` (المنتج رقم ${counter})` : '';

    newRow.innerHTML = `
        <label for="${colorId}">اللون${productNum}:</label>
        <select id="${colorId}" name="color_${counter}">
            <option value="أحمر">أحمر</option>
            <option value="أزرق">أزرق</option>
            <option value="سماوي">سماوي</option>
            <option value="وردي">وردي</option>
        </select>  

        <label for="${sizeId}">المقاس${productNum}:</label>
        <select id="${sizeId}" name="size_${counter}" disabled>
            <option value="28 × 20">28 × 20سم</option>
        </select>  

        <label for="${qtyId}">الكمية${productNum}:</label>
        <input type="number" id="${qtyId}" name="quantity_${counter}" value="1" min="1">

        <button type="button" class="remove-btn">إزالة</button>
    `;

    container.appendChild(newRow);

    newRow.querySelector(".remove-btn").addEventListener("click", function () {
        container.removeChild(newRow);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Set Arabic product details
    document.getElementById("product-name").textContent = "مصحف التجويد الملون";
    document.getElementById("product-price").textContent = "4500 دج";

    // Update initial labels for mobile only
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        const initialLabels = document.querySelectorAll(".selection-row label");
        initialLabels.forEach(label => {
            const text = label.textContent;
            if (!text.includes("المنتج رقم")) {
                label.textContent = text.replace(":", ` (المنتج رقم 1):`);
            }
        });
    }

    const images = ["4.jpg", "1.jpg", "2.jpg", "3.jpg"];
    let currentImageIndex = 0;
    const productImage = document.getElementById("product-image");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    if (images.length > 0) {
        productImage.src = images[0];
    }

    prevButton.addEventListener("click", () => changeImage(-1));
    nextButton.addEventListener("click", () => changeImage(1));

    // Arabic color options
    const colorSelect = document.getElementById("color-select");
    colorSelect.innerHTML = `
        <option value="أحمر">أحمر</option>
        <option value="أزرق">أزرق</option>
        <option value="سماوي">سماوي</option>
        <option value="وردي">وردي</option>
    `;

    // Arabic size option
    const sizeSelect = document.getElementById("size-select");
    sizeSelect.innerHTML = `<option value="28 × 20سم">28سم × 20سم</option>`;
    sizeSelect.disabled = true;

    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        productImage.style.transition = "opacity 0.15s ease-in-out, transform 0.15s ease-in-out";
        productImage.style.opacity = "0.3";
        productImage.style.transform = "scale(0.98)";
        
        setTimeout(() => {
            productImage.src = images[currentImageIndex];
            productImage.style.opacity = "1";
            productImage.style.transform = "scale(1)";
        }, 100);
    }
});
