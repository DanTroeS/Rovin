document.addEventListener("DOMContentLoaded", async () => {
    const list = document.querySelector(".sevices-list"); 
    const offerTitle = document.querySelector(".offer-main h3");
    const offerPrice = document.querySelector(".offer-main span");
    const offerDesc = document.querySelector(".offer-main p");

    const optionItems = document.querySelectorAll('.option-item');

    let services = [];

    try {
        const res = await fetch("get_services.php");
        
        services = await res.json();
        console.log("Полученные услуги:", services);

        if (!Array.isArray(services) || services.length === 0) {
            list.innerHTML = "<p>Нет услуг в базе данных.</p>";
            return;
        }

        function renderServices(category) {
    list.innerHTML = "";

    const filtered = services.filter(s =>
        s.category?.trim().toLowerCase() === category.trim().toLowerCase()
    );

    if (filtered.length === 0) {
        list.innerHTML = "<p>Нет услуг в этой категории.</p>";
        offerTitle.textContent = "";
        offerPrice.textContent = "";
        offerDesc.textContent = "";
        return;
    }

    filtered.forEach((service, index) => {
        const item = document.createElement("div");
        item.classList.add("services-item");
        if (index === 0) item.classList.add("active");

        const heading = document.createElement("div");
        heading.classList.add("type-heading");

        const h3 = document.createElement("h3");
        h3.textContent = service.name;

        const span = document.createElement("span");
        span.textContent = service.price + " ";

        heading.appendChild(h3);
        heading.appendChild(span);

        const desc = document.createElement("div");
        desc.classList.add("type-description");
        desc.textContent = service.description;

        item.appendChild(heading);
        item.appendChild(desc);

        item.addEventListener("click", () => {
            document.querySelectorAll(".services-item").forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            offerTitle.textContent = service.name;
            offerPrice.textContent = service.price ;
            offerDesc.textContent = service.description;
        });

        list.appendChild(item);
    });

    const firstService = filtered[0];
    offerTitle.textContent = firstService.name;
    offerPrice.textContent = firstService.price + " ";
    offerDesc.textContent = firstService.description;
}


       
        optionItems.forEach(item => {
            item.addEventListener('click', () => {
                optionItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const category = item.dataset.category;
                renderServices(category);
            });
        });

      
        if (optionItems.length > 0) {
            const firstCategory = optionItems[0].dataset.category;
            optionItems[0].classList.add('active');
            renderServices(firstCategory);
        }

    } catch (err) {
        console.error("Ошибка загрузки:", err);
        list.innerHTML = "<p>Ошибка загрузки данных.</p>";
    }
});