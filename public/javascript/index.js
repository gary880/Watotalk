var socket = io();
        const form = document.getElementById('form');
        const input = document.getElementById('message');
        const messageList = document.getElementById('messageList');
        const userData = getUrlValues(window.location.search);
        const usersList = document.querySelector('.usersList');
        //basic data object
        const obj = {
            name: userData.username,
            message: "",
            room: userData.room
        };

        //send room id and user to server
        socket.emit('join', obj);

        //submit message
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (input.value) {
                obj.message = input.value;
                socket.emit('chat', obj);
                input.value = '';
            }
        });

        //print current room on side navbar
        let roomName = document.querySelector('.roomName');
        roomName.innerHTML = '#' + obj.room;

        //print usersList at side navbar
        socket.on('usersInRoom', (users) => {
            printUsersList(users);
        });

        //print message
        socket.on('chat-broadcast', (obj) => {
            const showMessage = document.createElement('div');
            showMessage.innerHTML = `<span class="name">${obj.name}  :</span>
            <span class="chatContent">${obj.message}</span>`;
            let div = document.querySelector('.messageBox');
            div.appendChild(showMessage);
            //let new message always at the bottom
            div.scrollTop = div.scrollHeight;
        });

        socket.on('disconnectMessage', (user) => {
            const showMessage = document.createElement('div');
            //print user leave message
            showMessage.innerHTML = `<span class="name">system :</span>
            <span class="chatContent">${user.name} has disconnected </span>`;
            let div = document.querySelector('.messageBox');
            div.appendChild(showMessage);
            div.scrollTop = div.scrollHeight;
        })

        //get url username and room id
        function getUrlValues() {
            let values = {};
            let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                values[key] = value;
            });
            return values;
        }

        function printUsersList(users) {
            usersList.innerHTML = `
            ${users.map(user => `<li>${user.name}</li>`).join('')}
            `;
        }