const users = [];

//把user的obj丟進users
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

function userDisconnect(id){

    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }

}



module.exports = {
    Joinroom,
    getCurrentUser,
    getRoomUsers,
    userDisconnect
};