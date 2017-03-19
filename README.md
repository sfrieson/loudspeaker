# Loudspeaker

An event emitter whose purpose is to be as feature-rich as possible. This is meant to be more of an experiment of 
pushing the boundaries of what Event Emitters currently do. The mission is as max features, not min file size. Ease 
of use is also be a goal.


# Version 1.0.0

This first version is simply an event emitter.  It does what it's supposed to do. It's the first step.


# Future Version Ideas
- Common interface for cross browser events
- Intercepting all events
- Event statistics
- All the stuff everyone else does
- More...

# Documentation

## Loudspeaker#on

`Loudspeaker.on(event:string, handler:function[, handerThis:object])`

To start listening use this with an `event` name that you know will be emitted by Loudspeaker (currently dom events 
are not supported).

### Handler

`function ([...args]) {}`

The handler will call with the emitted arguments applied.

## Loudspeaker#off

`Loudspeaker.off(event:string, handler:function)`

To stop listening for a specific handler.

## Loudspeaker#emit

`Loudspeaker.emit(event:string, eventArguments:array)`

Emits the event for all the handlers that might be listening, sent along with the arguments that should be included 
in the handler.