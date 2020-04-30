import '~index.css';

import { HelloWorld } from '~js/HelloWorld';

const greeting = document.createElement('h1');
greeting.textContent = HelloWorld();

const app = document.querySelector('#root');
app.append(greeting);
