import emitter from './src';

const Loudspeaker = {
  on: emitter.on.bind(emitter),
  off: emitter.off.bind(emitter),
  emit: emitter.emit.bind(emitter)
};

module.exports = Loudspeaker;