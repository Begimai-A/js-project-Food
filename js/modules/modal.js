function modal(){
    // MODALS

    const modalTrigger = document.querySelectorAll('[data-modal'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal);


    });


    modal.addEventListener('click', (e) => {

        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }

    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }

    });

    const modalTimerId = setTimeout(openModal, 3000);

    // window.pageYOffset; // свойство которое отвечает за прокрутку сверху
    //document.documentElement.clientHeight // свойство которое отображает высоту видимой части клиенту
    // document.documentElement.scrollHeight // свойство которое отображает высоту с полным контентом,с полной прокруткой 

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }

    }

    window.addEventListener('scroll', showModalByScroll);

    


}

export default modal;