const popupLinks = document.querySelectorAll('.popup-links');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock_padding");
const animItems = document.querySelectorAll('._anim-items');


let unlock = true;

const timeout = 800;



if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animCofficient = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animCofficient;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animCofficient;
            }
            if ((pageYOffset > animItemOffset - animItemPoint)&& pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_anim_active');
            } else {
                if (!animItem.classList.contains('_always_active')) {
                    animItem.classList.remove('_anim_active');
                }
                
            }
        }
    }
    setTimeout(() => {
        animOnScroll();
    }, 500);
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    
}

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length;index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click" , function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
            
        });
    }
}
const popupBody = document.querySelectorAll('.popup_body');
if (popupBody.length > 0) {
    for (let index = 0; index < popupBody.length; index++) {
        const popupL = popupBody[index];
        const popupLo = popupL.classList.contains('locks');
        if (popupLo) {
            popupL.style.marginTop = ('5%');
        }
        
    }
}

const popupCloseIcon = document.querySelectorAll('.close_popup');

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
        if (el.closest('.img')) {
            el.classList.add('r');
            el.style.fontSize = "50px";
            
            
        } else{
            el.classList.add('l');

        }

    }
    
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click",function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
                
            } 
        });
    } 
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const wrapper = document.querySelector('.wrapper');
    const wrapperWidht = wrapper.offsetWidth;

    const lockPaddingValue = window.innerWidth - wrapperWidht + 'px';
    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
            
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {  
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
        
        
    }, timeout);
    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
    
}
