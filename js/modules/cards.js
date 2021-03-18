function cards() {
    // Создаем классы

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // render() {}=> В этом методе нам  нужно 
        // 1) создать элемент;
        // 2) в него поместить верстку; 
        // 3) Эту верстку дополнить данными которые приходят как аргументы
        // 4) Поместить этот элемент на страницу

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div> `;

            this.parent.append(element);
        }
    }

    const getResourses = async (url) => {
        const res = await fetch(url);
        // У fetch промиса есть такие свойства как "ок", 'status', и объект error.
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json(); // превращает данные обратно в js объект
    };

    getResourses('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu .container'
    // ).render();

   
}

module.exports = cards;