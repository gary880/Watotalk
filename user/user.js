const users = [];


function Joinroom(id, name, roomId) {

    const user = { id, name, roomId };

    users.push(user);
    return user;
}

function getCurrentUser(id) {

    return users.find(user => user.id === id);

}

module.exports = {
    Joinroom,
    getCurrentUser
};