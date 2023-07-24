import { App } from './components/app';
import { EventEmitter } from './components/emitter';

const emitter = new EventEmitter();
const app = new App(emitter);
app.appendElement(document.body);
