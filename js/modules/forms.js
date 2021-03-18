function forms() {
    // POSTing DATA with fetch()
    // FORMS

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: "We will contact you soon",
        failure: "Oops, something gone wrong"
    };

    forms.forEach(item => { //   функции с переменной вызываются после объявления самой функции
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data

        });
        return await res.json();

    };



    function bindPostData(form) { //обычные функции без объявления  переменной могут вызываться где угодно
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display:block;
            margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);


            // Отправка данных through Object.fromentries and formData.entries();

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // formData.entries() превращает в массив массивов, затем
            // Object.fromEntries преобразует Array в Object


            postData(' http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); // удаляются values of input
                });
        });

    }


    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');
        previousModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
               <div class="modal__close" data-close>&times;</div>
               <div class="modal__title"> ${message} </div>

             </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // // GETting data with fetch()

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
}

module.exports = forms;