import Queue from '../lib/queue';

const Loudspeaker = {
queue: new Queue(),
events: {}
};

Loudspeaker.callQueue = function () {
  while (!this.queue.isEmpty()) this.queue.dequeue()();
};

// TODO Context not in docs. Remove at will. Won't require new version
Loudspeaker.on = function (event, handler, context) {
  this.events[event] = this.events[event] || [];
  context = context || null;
  this.events[event].push({fn: handler, context: context});
  this.callQueue();
};

Loudspeaker.off = function (event, targetHandler) {
  // TODO type checking
  if (!targetHandler) return false;

  let handlers = this.events[event];
  if (!handlers) return false;

  const originalLength = handlers.length;
  // true means remove all handlers
  if (targetHandler === true) {
    this.events[event] = new Queue();
  } else {
    // If a queue for this event is found, loop through entirety removing all instances
    // TODO Should this be changed to a loop and break on first found instance, assuming there's only one instance of fn?
    this.events[event] = handlers.filter(function (h) {
      return h.fn !== targetHandler;
    });
  }

  // Were any removed?
  return this.events[event].length !== originalLength;
};

Loudspeaker.addToCallQueue = function (listenerArr, emitterArgs) {
  var queue = this.queue;
  // TODO should this change to a for loop with setTimeout(fn, 0) ?
  listenerArr.forEach(function (handler) {
    queue.enqueue(function () { handler.fn.apply(handler.context, emitterArgs); });
  });
};

Loudspeaker.emit = function (event, args) {
  let e;
  if ((e = this.events[event])) this.addToCallQueue(e, args);
  this.callQueue();
};

export default Loudspeaker;