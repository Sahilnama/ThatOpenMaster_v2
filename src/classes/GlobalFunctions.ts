export type PopType = 'error' | 'warn' | 'info' | 'success';



export const toggleModal = (id: string, state: true|false) => {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        // check if modal is a dialog element as all html elements do not have toggleModal method
        if (state == false) {
            modal.close();
        } else if (state == true) {
            modal.showModal();
        }else{
            console.warn('Invalid state value');
        }
    } else {
        console.warn(`Modal named ${id} not found`);
    }
};

export const ShowPopUp = (type: PopType, message: string) => {
    const popUp = document.getElementById('pop-up-modal') as HTMLElement;

    if (popUp) {
        switch (type) {
            case 'error':
                popUp.innerHTML = `<div>
                <header style="background-color: rgb(240, 61, 61);">
                    <span class="material-symbols-outlined">error</span>Error <button  class="close-btn"><span class="material-symbols-outlined">close</span></button>
                </header>
                <div class="message" style="color: white;">${message}</div>
            </div>`;
                break;
            case 'warn':
                popUp.innerHTML = `<div>
                <header style="background-color: rgb(255, 204, 0);">
                    <span class="material-symbols-outlined">warning</span>Warning <button  class="close-btn"><span class="material-symbols-outlined">close</span></button>
                </header>
                <div class="message" style="color: white;">${message}</div>`
                break;
            case 'info':
                popUp.innerHTML = `<div>
                <header style="background-color: rgb(0, 153, 255);">
                    <span class="material-symbols-outlined">info</span>Info <button  class="close-btn"><span class="material-symbols-outlined">close</span></button>
                </header>
                <div class="message" style="color: white;">${message}</div>`
                break;
            case 'success':
                popUp.innerHTML = `<div>
                <header style="background-color: rgb(0, 204, 102);">
                    <span class="material-symbols-outlined">check_circle</span>Success <button  class="close-btn"><span class="material-symbols-outlined">close</span></button>
                </header>
                <div class="message" style="color: white;">${message}</div>`
                break;
        }
    }else{
        console.warn('Pop-up modal not found');
    }

    toggleModal('pop-up-modal', true);
}

export const HidePopUpWhenClosed = () => {
    const closeBtn = document.querySelector('.close-btn');
    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            toggleModal('pop-up-modal', false);
        });
    }else{  
        console.warn('Close button not found');
    }
}