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
    const productNum = (isMobile && counter > 1) ? ` (المنتج رقم ${counter})` : '';
    const separator = (isMobile && counter > 1) ? `<div class="product-separator"></div>` : '';
    const removeBtnText = isMobile ? "إزالة المنتج المضاف" : "إزالة";

    newRow.innerHTML = `
        ${separator}
        <label for="${colorId}">اللون${productNum}:</label>
        <select id="${colorId}" name="color_${counter}">
            <option value="بني">بني</option>
            <option value="سماوي">سماوي</option>
            <option value="وردي">وردي</option>
        </select>  

        <label for="${sizeId}">المقاس${productNum}:</label>
        <select id="${sizeId}" name="size_${counter}" disabled>
            <option value="28 × 20سم">28سم × 20سم</option>

        </select>  

        <label for="${qtyId}">الكمية${productNum}:</label>
        <input type="number" id="${qtyId}" name="quantity_${counter}" value="1" min="1">

        <button type="button" class="remove-btn">${removeBtnText}</button>
    `;

    container.appendChild(newRow);

    newRow.querySelector(".remove-btn").addEventListener("click", function () {
        container.removeChild(newRow);
    });
});

// ... rest of your existing JavaScript code ...

// Inject CSS for the separator and remove button
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .product-separator {
            margin: 10px auto;
            width: 75%;
            border-top: 3px dashed black;
        }
    }

    .remove-btn {
        background-color: #e63946;
        color: #fff;
        border: none;
        padding: 8px 12px;
        margin-top: 10px;
        cursor: pointer;
        border-radius: 6px;
        font-weight: bold;
        transition: background-color 0.3s ease;
    }

    .remove-btn:hover {
        background-color: #c62828;
    }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", function () {
    // Set Arabic product details
    document.getElementById("product-name").textContent = "مصحف الفاخر";
    document.getElementById("product-price").textContent = "4500 دج";

    const images = ["20250412_103122.jpg", "1.jpg", "2.jpg", "3.jpg"];
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
        <option value="بني">بني</option>
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
