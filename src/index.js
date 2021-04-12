import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './assets'

var button = document.getElementById('user-avatar')

button.addEventListener('click', _ => {
    createConversationIcon("Test", "testing message", "15:00", null, null)
})

function createConversationIcon(name, lastMessage, time, status, avatar){

    if(lastMessage.length > 25){
        lastMessage = lastMessage.slice(0, 22)
        lastMessage = lastMessage + '...'
    }

    var div = document.createElement('div')

    if(!avatar){
        var avatarImage = 
        `
        <button class="" id="conversation-button">
            <svg class="svg-inline--fa fa-user fa-w-14 avatar-icon pt-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg><!-- <i class="fas fa-user avatar-icon pt-1"></i> Font Awesome fontawesome.com -->
            <div id="conversation-details">
                <div id="conversation-name">
                    ${name}
                </div>
                <div id="conversation-lastmessage">
                    <svg id="conversation-status" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                    </svg>
                    <div id="lastmessage-text">
                    ${lastMessage}
                    </div>
                </div>
            </div>

            <div id="conversation-time">
                ${time}
            </div>
        </button>
        `
        

        div.insertAdjacentHTML('afterbegin', avatarImage )
    }

    var conversationList = document.getElementById('conversation-list')

    var newUl = document.createElement('li')

    var button = document.createElement('button')

    console.log(div)

    button.appendChild(div)

    button.classList.add('conversation-button')

    newUl.appendChild(button)

    newUl.classList.add('conversation-li')

    conversationList.appendChild(newUl)
}