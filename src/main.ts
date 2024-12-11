import { socketClient } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Websockets!</h1>

    <input id="jwt-input" placeholder="JWT here" />
    <button id="jwt-button">Connected</button>

    <p id="status">Offline</p>
    <ul id="clients-ul">
    </ul>

    <form id="form-message">
      <input id="input-message" placeholder="Message here" />
    </form>

    <h3>Chat</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const input = document.querySelector<HTMLInputElement>("#jwt-input")!;
const button = document.querySelector<HTMLButtonElement>("#jwt-button")!;

button.addEventListener("click", () => {

  if(input.value.trim().length === 0) return alert('Paste a JWT');

  socketClient(input.value.trim());
});

