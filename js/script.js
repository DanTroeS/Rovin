document.addEventListener("DOMContentLoaded", () => {
  const btnMain = document.getElementById("btn");
  const nameInput = document.getElementById("name");
  const serviceTitle = document.getElementById("servicess"); 
  const servicePrice = serviceTitle.nextElementSibling;      
  const serviceDesc = servicePrice.nextElementSibling;  
  const emailInput = document.getElementById("mail");
  const mainCheckbox = document.querySelector(".offer-form .custom-checkbox");

  
  const TOKEN = "7831494057:AAFgclHwqwv47ISZwsbq2xVSAKxRrl6uD20";
  const CHAT_ID = "1010379625";
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  btnMain.addEventListener("click", async (e) => {
    e.preventDefault();

    let isValid = true;
    [nameInput, emailInput].forEach(el => el.style.borderColor = "");

    if (nameInput.value.trim() === "") {
      nameInput.style.borderColor = "red";
      isValid = false;
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.style.borderColor = "red";
      isValid = false;
    }

    if (!mainCheckbox.checked) {
      isValid = false;
    }

    if (!isValid) {
      btnMain.classList.add("error");
      setTimeout(() => btnMain.classList.remove("error"), 300);
      return;
    }

    const serviceName = serviceTitle.textContent.trim();
    const serviceCost = servicePrice.textContent.trim();
    const serviceDescription = serviceDesc.textContent.trim();

    const message = `
      💌 Новая заявка с сайта:
      👤 Имя: ${nameInput.value}
      📧 Email: ${emailInput.value}
      🛠 Услуга: ${serviceName}
      💰 Цена: ${serviceCost}
      📄 Описание: ${serviceDescription}
    `;

    try {
      const response = await fetch(URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "HTML"
        }),
      });

      if (response.ok) {
        handleSuccess(btnMain, [nameInput, emailInput], mainCheckbox);
      } else {
        alert("Ошибка при отправке сообщения в Telegram");
      }
    } catch (err) {
      console.error("Ошибка Telegram:", err);
      alert("Ошибка соединения с Telegram API");
    }
  });


  function handleSuccess(button, inputs, checkbox) {
    button.classList.add("success");
    button.textContent = "Отправлено ✓";
    button.disabled = true;

    setTimeout(() => {
      button.classList.remove("success");
      button.textContent = "Отправить";
      button.disabled = false;
      inputs.forEach(i => i.value = "");
      if (checkbox) checkbox.checked = false;
    }, 3000);
  }
  
});