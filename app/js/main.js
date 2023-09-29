import { cardArray } from "./base";
import { fetchData } from "./fetch";

const cardBlock = document.querySelector(".cards__block");
const btnAddCard = document.querySelector(".add-card");
const btnBurger = document.querySelector(".navbar__burger");
const navbarLinks = document.querySelector(".navbar__links");
const navbarContactsBlock = document.querySelector(".navbar__contacts");
const btnModal = document.querySelectorAll(".submit");
const btnModalClosse = document.querySelector(".modal__close");
const modalWindow = document.querySelector(".overlay");
const form = document.querySelector(".modal__form");
const submitButton = document.querySelector(".button_submit");

const rndImage = () => {
  const imgItem = [
    "./images/cardImg/2.webp",
    "./images/cardImg/1.webp",
    "./images/cardImg/5.webp",
  ];
  let rnd = Math.floor(Math.random() * 3);
  return imgItem[rnd];
};

btnBurger.addEventListener("click", () => {
  if (navbarLinks.classList.contains("show")) {
    navbarLinks.classList.remove("show");
  } else {
    navbarLinks.classList.add("show");
  }
  if (navbarContactsBlock.classList.contains("show_contacts")) {
    navbarContactsBlock.classList.remove("show_contacts");
  } else {
    navbarContactsBlock.classList.add("show_contacts");
  }
});

const callModalWindow = () => {
  btnModal.forEach((item) => {
    item.addEventListener("click", () => {
      modalWindow.classList.add("overlay-show");
    });
  });
  btnModalClosse.addEventListener("click", () => {
    modalWindow.classList.remove("overlay-show");
  });
  window.addEventListener("click", () => {
    if (event.target == modalWindow) {
      modalWindow.classList.remove("overlay-show");
    }
  });
};

let count = 10; // Начальное количество карточек

btnAddCard.addEventListener("click", async () => {
  count += 5;
  if (count >= 35) {
    return count;
  }

  const mergetArr = await fetchData();
  const resultArr = [...cardArray, ...mergetArr].slice(0, count);

  const cardsHtml = createCard(resultArr);
  cardBlock.innerHTML = cardsHtml;
});

export const createCard = (items) => {
  let cardsHtml = "";

  items.forEach((item) => {
    cardsHtml += `
    <div class="cards__item card">
      <img src="${
        item.imgSrc ? item.imgSrc : rndImage()
      }" alt="img" class="card__img" />
      <div class="card__text-block">
        <h3 class="card__title">${item.title}</h3>
        <span class="card__subtitle">${
          item.subtitle ? item.subtitle : "How to increase your"
        }</span>
        <p class="card__descripton">${item.body}</p>
        <span class="card__autor">${
          item.author
            ? item.author
            : "Posted by <b>Eugenia</b>, on July 24, 2019"
        }</span>
        <button class="card__btn-black">Continue reading</button>
      </div>
    </div>`;
  });

  return cardsHtml;
};

(async () => {
  const mergetArr = await fetchData();
  const resultArr = [...cardArray, ...mergetArr].slice(0, count);
  cardBlock.innerHTML = createCard(resultArr);
})();

const validateForm = () => {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    const nameInput = form.querySelector('input[name="name"]');
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');

    // Проверяем, что поля не пустые
    if (!nameInput.value.trim()) {
      alert("Пожалуйста, введите ваше имя.");
      nameInput.focus();
      return;
    }

    if (!phoneInput.value.trim()) {
      alert("Пожалуйста, введите ваш телефон.");
      phoneInput.focus();
      return;
    }

    if (!emailInput.value.trim()) {
      alert("Пожалуйста, введите ваш E-mail.");
      emailInput.focus();
      return;
    }

    // Дополнительная проверка для E-mail с использованием регулярного выражения
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(emailInput.value)) {
      alert("Пожалуйста, введите корректный E-mail адрес.");
      emailInput.focus();
      return;
    }

    // Если все проверки пройдены, можно отправить форму
    alert("Форма успешно отправлена!");
    form.reset(); // Очищаем форму (по желанию)
  });
};
validateForm();
callModalWindow();
