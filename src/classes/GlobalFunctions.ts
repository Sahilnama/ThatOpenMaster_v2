export type PopType = 'error' | 'warn' | 'info' | 'success';



export const toggleModal = (modal: HTMLDialogElement, state: true|false) => {
    // const modal = document.getElementById(id);
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
        console.warn(`Modal named ${modal} not found`);
    }
};

const popUp = document.getElementById('pop-up-modal') as HTMLDialogElement;
export const ShowPopUp = (type: PopType, message: string) => {

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
        HidePopUpAutoOrWhenClosed();
    }else{
        console.warn('Pop-up modal not found');
    }

    toggleModal(popUp, true);
}

export const HidePopUpAutoOrWhenClosed = () => {
    const closeBtn = document.querySelector('.close-btn');
    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            toggleModal(popUp, false);
        });
        setTimeout(() => {
            toggleModal(popUp, false);
          }, 1000);
    }else{  
        console.warn('Close button not found');
    }
}

export const getNameInitials = (name: string) => {    
    const initials = name.split(' ').slice(0,2).map((n) => n[0]).join('');
    return initials.toUpperCase();
    
}

export const show = (e:HTMLElement)=>{
    e.classList.remove('hidden')
}
export const hide = (e:HTMLElement)=>{
    e.classList.add('hidden')
}

export const genColorFn = () => {
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    return colors[Math.floor(Math.random() * colors.length)];

}