import Queue from '../lib/queue';

const Loudspeaker = {
queue: new Queue(),
events: {}
};

Loudspeaker.callQueue = function () {
while (!this.queue.isEmpty()) this.queue.dequeue()();
};

Loudspeaker.on = function (event, handler, context) {
this.events[event] = this.events[event] || [];
context = context || null;
this.events[event].push({fn: handler, context: context});
this.callQueue();
};
Loudspeaker.off = function (event, targetHandler) {
let handlers = this.events[event];

this.events[event] = handlers.filter(function (h) {
return h.fn !== targetHandler;
});

// Were any removed?
return this.events[event].length !== handlers.length;
};

Loudspeaker.addToCallQueue = function (listenerArr, emitterArgs) {
listenerArr.forEach(function (handler) {
this.queue.enqueue(function () { handler.fn.apply(handler.context, emitterArgs); });
}.bind(this));
};

Loudspeaker.emit = function (event, args) {
let e;
if ((e = this.events[event])) this.addToCallQueue(e, args);
this.callQueue();
};

export default Loudspeaker;