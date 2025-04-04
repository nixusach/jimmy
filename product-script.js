let counter = 1;

document.getElementById("add-more").addEventListener("click", function () {
    let container = document.getElementById("selection-container");

    // Create a new selection row
    let newRow = document.createElement("div");
    newRow.classList.add("selection-row");

    // Set unique IDs for each field
    const colorId = `color-select-${counter}`;
    const sizeId = `size-select-${counter}`;
    const qtyId = `quantity-${counter}`;

    newRow.innerHTML = `
        <label for="${colorId}">Color:</label>
        <select id="${colorId}" name="color_${counter}">
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Cyan">Cyan</option>
            <option value="Rose">Rose</option>
        </select>  

        <label for="${sizeId}">Size:</label>
        <select id="${sizeId}" name="size_${counter}" disabled>
            <option value="20cm x 28cm">20cm x 28cm</option>
        </select>  

        <label for="${qtyId}">Quantity:</label>
        <input type="number" id="${qtyId}" name="quantity_${counter}" value="1" min="1">

        <button type="button" class="remove-btn">Remove</button>
    `;

    // Append new row to container
    container.appendChild(newRow);

    // Add event listener to remove button
    newRow.querySelector(".remove-btn").addEventListener("click", function () {
        container.removeChild(newRow);
    });

    counter++; // Increment counter for next use
});


// ----------------- Manually Set Product Details -----------------
document.addEventListener("DOMContentLoaded", function () {
    // Set fixed product details
    document.getElementById("product-name").textContent = "Sample Product";
    document.getElementById("product-price").textContent = "2000 DA";

    // Fixed images
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

    // Populate color dropdown
    const colorSelect = document.getElementById("color-select");
    colorSelect.innerHTML = `
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Cyan">Cyan</option>
        <option value="Rose">Rose</option>
    `;

    // Populate size dropdown (Only one size)
    const sizeSelect = document.getElementById("size-select");
    sizeSelect.innerHTML = `<option value="20cm x 28cm">20cm x 28cm</option>`;
    sizeSelect.disabled = true; // Since there's only one option

    // Faster and smoother image transition effect
    function changeImage(direction) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        
        productImage.style.transition = "opacity 0.15s ease-in-out, transform 0.15s ease-in-out";
        productImage.style.opacity = "0.3";
        productImage.style.transform = "scale(0.98)"; // Slight shrink effect

        setTimeout(() => {
            productImage.src = images[currentImageIndex];
            productImage.style.opacity = "1";
            productImage.style.transform = "scale(1)";
        }, 100); // Faster transition effect
    }
});
