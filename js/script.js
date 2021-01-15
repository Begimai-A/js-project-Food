"use strict";

document.addEventListener('DOMContentLoaded',() => {
    
    // TABS

    const tabs=document.querySelectorAll('.tabheader__item'),
        tabsContent=document.querySelectorAll('.tabcontent'),
        tabsParent=document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item =>{
            item.style.display='none';
        });

        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i=0){ // вызов по умолчанию
        tabsContent[i].style.display='block';
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

  tabsParent.addEventListener('click', (event)=>{
       const target=event.target;
         if(target && target.classList.contains('tabheader__item')){
           tabs.forEach((item, i)=>{
                if(item==target){
                hideTabContent();
                showTabContent(i);
               }
            });
  
        }

    });

    // TIMER

    const deadline='2021-03-25';

    function getRemainingTime ( endtime) {
        const t=Date.parse(endtime) - Date.parse(new Date()),
              days=Math.floor( (t/(1000*60*60*24)) ),
              hours=Math.floor((t/(1000*60*60)%24)),
              minutes=Math.floor((t/1000/60) % 60),
              seconds=Math.floor((t/1000)%60);

        return {
            'total': t,
            'days': days,
            'hours':hours,
            'minutes': minutes,
            'seconds': seconds
                 
        };
    }

    function getZero (num) {
        if (num >=0 && num < 10) {
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock (selector, endtime) {

        const timer=document.querySelector(selector),
            days=document.querySelector('#days'),
            hours=document.querySelector('#hours'),
            minutes=document.querySelector('#minutes'),
            seconds=document.querySelector('#seconds'),
            timeInterval=setInterval(updateClock, 1000);

        updateClock();   
            
        
        function updateClock (){
            const t=getRemainingTime(endtime);

            days.innerHTML=getZero(t.days);
            hours.innerHTML= getZero(t.hours);
            minutes.innerHTML=getZero(t.minutes);
            seconds.innerHTML=getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // MODALS

    const modalTrigger=document.querySelectorAll('[data-modal'),
        modal=document.querySelector('.modal'),
        modalCloseBtn=document.querySelector('[data-close]');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow='hidden';
    }
    
    function closeModal (){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow='';
    }

    modalTrigger.forEach((btn)=>{
        btn.addEventListener('click', openModal);


    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e)=>{

        if(e.target===modal){
            closeModal();
        }

    });

    document.addEventListener('keydown', (e)=>{
        if(e.code==="Escape" && modal.classList.contains('show')){
            closeModal();
        }

    });

    //const modalTimerId=setTimeout();

   

});