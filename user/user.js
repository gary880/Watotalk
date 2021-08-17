const users = [];


function Joinroom(id, name, roomId) {

    const user = { id, name, roomId };

    users.push(user);
    return user;
}

function getCurrentUser(id) {

    return users.find(user => user.id === id);

}

function getRoomUsers(roomId){
    return users.filter(user => user.roomId  === roomId);
}

module.exports = {
    Joinroom,
    getCurrentUser,
    getRoomUsers
};