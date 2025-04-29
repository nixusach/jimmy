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
            <option value="أزرق">أزرق</option>
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
        updatePrices();
    });

    // Add event listener for quantity change
    newRow.querySelector(`#${qtyId}`).addEventListener("change", updatePrices);
});

// Product images gallery
document.addEventListener("DOMContentLoaded", function () {
    // Set Arabic product details
    document.getElementById("product-name").textContent = "مصحف الفاخر Vip";
    document.getElementById("product-price").textContent = "4500 دج";

    const images = ["20250412_103122.jpg", "IMG_20250415_070743.jpg", "2.jpg", "3.jpg", "20250419_102628.jpg", "20250419_102713.jpg", "20250419_143639.jpg", "20250419_102617.jpg"];
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

    // Initialize wilaya select and price calculation
    initializeWilayaSelect();
    updatePrices();
});

// Algerian wilayas
const wilayas = [
    "أدرار", "الشلف", "الأغواط", "أم البواقي", "باتنة", "بجاية", "بسكرة", "بشار", "البليدة", "البويرة",
    "تمنراست", "تبسة", "تلمسان", "تيارت", "تيزي وزو", "الجزائر", "الجلفة", "جيجل", "سطيف", "سعيدة",
    "سكيكدة", "سيدي بلعباس", "عنابة", "قالمة", "قسنطينة", "المدية", "مستغانم", "المسيلة", "معسكر", "ورقلة",
    "وهران", "البيض", "إليزي", "برج بوعريريج", "بومرداس", "الطارف", "تندوف", "تيسمسيلت", "الوادي", "خنشلة",
    "سوق أهراس", "تيبازة", "ميلة", "عين الدفلى", "النعامة", "عين تموشنت", "غرداية", "غليزان", "تميمون",
    "برج باجي مختار", "أولاد جلال", "بني عباس", "عين صالح", "عين قزام", "تقرت", "جانت", "المغير", "المنيعة"
];

// Delivery prices for each wilaya
const deliveryPrices = {
    "أدرار": 500, "الشلف": 300, "الأغواط": 400, "أم البواقي": 350, "باتنة": 350, 
    "بجاية": 300, "بسكرة": 400, "بشار": 600, "البليدة": 250, "البويرة": 300,
    "تمنراست": 700, "تبسة": 400, "تلمسان": 350, "تيارت": 350, "تيزي وزو": 300, 
    "الجزائر": 200, "الجلفة": 400, "جيجل": 300, "سطيف": 350, "سعيدة": 450,
    "سكيكدة": 300, "سيدي بلعباس": 400, "عنابة": 300, "قالمة": 350, "قسنطينة": 300, 
    "المدية": 300, "مستغانم": 350, "المسيلة": 400, "معسكر": 400, "ورقلة": 500,
    "وهران": 350, "البيض": 450, "إليزي": 650, "برج بوعريريج": 350, "بومرداس": 250, 
    "الطارف": 300, "تندوف": 800, "تيسمسيلت": 400, "الوادي": 450, "خنشلة": 400,
    "سوق أهراس": 400, "تيبازة": 300, "ميلة": 350, "عين الدفلى": 300, "النعامة": 500, 
    "عين تموشنت": 400, "غرداية": 500, "غليزان": 350, "تميمون": 600,
    "برج باجي مختار": 700, "أولاد جلال": 500, "بني عباس": 600, "عين صالح": 650, 
    "عين قزام": 700, "تقرت": 500, "جانت": 750, "المغير": 550, "المنيعة": 600
};

function initializeWilayaSelect() {
    const wilayaSelect = document.getElementById('wilaya-select');
    
    // Clear existing options
    wilayaSelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'اختر الولاية';
    wilayaSelect.appendChild(defaultOption);

    // Add wilaya options
    wilayas.forEach(w => {
        const option = document.createElement('option');
        option.value = w;
        option.textContent = w;
        wilayaSelect.appendChild(option);
    });

    // Add event listener for wilaya change
    wilayaSelect.addEventListener('change', updatePrices);
}

function updatePrices() {
    const productPrice = 4500; // Base product price
    let totalQuantity = 0;
    
    // Calculate total quantity from all product rows
    const quantityInputs = document.querySelectorAll('input[type="number"][name^="quantity"]');
    quantityInputs.forEach(input => {
        totalQuantity += parseInt(input.value) || 0;
    });

    const selectedWilaya = document.getElementById('wilaya-select').value;
    const deliveryPrice = selectedWilaya ? deliveryPrices[selectedWilaya] : 0;
    const totalPrice = (productPrice * totalQuantity) + deliveryPrice;

    // Update displayed prices (only on mobile)
    document.getElementById('mobile-product-price').textContent = `${productPrice * totalQuantity} دج`;
    document.getElementById('delivery-price').textContent = selectedWilaya ? `${deliveryPrice} دج` : '0 دج';
    document.getElementById('total-price').textContent = `${totalPrice} دج`;
}

// Add event listeners for quantity changes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('input[name="quantity"]').addEventListener('change', updatePrices);
});

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
