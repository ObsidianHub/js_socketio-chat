class UI {
    constructor() {
        this.login = document.querySelector(".login");
        this.authorized = document.querySelector(".authorized");
        this.roomsList = document.querySelector(".rooms-list");
        this.usersList = document.querySelector(".users-list");
        this.messageContainer = document.querySelector(".message-container");
      }
    showLogin() {}

    hideLogin() {
        this.login.style.display = "none";
    }

    showAuthorized() {
        this.authorized.style.display = "block";
    }

    hideAuthorized() {}

    generateRooms(rooms) {
        this.roomsList.innerHTML = "";
        rooms.forEach((room, index) =>
            this.roomsList.insertAdjacentHTML(
            "beforeend",
            UI.roomListTemplate(room, index)
            )
        );
    }

    newUserJoin(name) {
        this.messageContainer.insertAdjacentHTML(
            "beforeend",
            UI.newUserJoinTemplate(name)
        );
    }
    
      userLeft(user) {
        this.messageContainer.insertAdjacentHTML(
            "beforeend",
            UI.userLeftTemplate(user)
        );
    }
}