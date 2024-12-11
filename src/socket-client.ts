import {Manager, Socket} from 'socket.io-client';

let socket : Socket;

export const socketClient = (JWT: string) => {

    const manager = new Manager('https://nest-teslo-shop-production-d20f.up.railway.app/socket.io/socket.io.js', {
        extraHeaders: {
            hellow: "hola!",
            authorization: JWT
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket("/");

    addEventListeners();
}


const addEventListeners = () => {
    const statusLabel = document.querySelector("#status")!;
    const clientsUl = document.querySelector("#clients-ul")!;
    const formMessage = document.querySelector("#form-message")!;
    const inputMessage = document.querySelector<HTMLInputElement>("#input-message")!;
    const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!;

    socket.on('connect', () => {
        statusLabel.innerHTML = "Online!";
    });

    socket.on('disconnect', () => {
        statusLabel.innerHTML = "Offline :(";
    });

    socket.on('clients-updated', (clients: string[]) => {
        let countHtml = ''

        clients.forEach( clientId => {
            countHtml += `<li>${clientId}</li>` 
        });
        clientsUl.innerHTML = countHtml;

    });

    formMessage.addEventListener("submit", (event) => {
        event.preventDefault();
        if(inputMessage.value.trim().length === 0) return;

        socket.emit('message-from-client', 
            {id: 'Yo', message: inputMessage.value});
        inputMessage.value = "";
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        let messageHtml = `
            <li>
            <strong>${payload.fullName}</strong>: ${payload.message}
            </li>
        `;
        const liElement = document.createElement("li");
        liElement.innerHTML = messageHtml;
        messagesUl.append(liElement);
    });
}