const generateId = () => {
    let lobbyId = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 7) {
    lobbyId += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
    }
    return lobbyId;
};

module.exports = {generateId}
