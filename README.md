# Overview
This is a small POC exploring what a potential V2 of the Segment server-side integration "class" could look like using TypeScript.

It also explores a potential v2 of the internal `facade` library also using TS.

# How is it Organized?
There are four main components in the system.

## `spec/`
The `/spec` directory stores a number of interfaces that collectively define the Segment spec. These interfaces are then implemented by `facade`.

## `facade/`
The `facade` directory stores the base `Facade` class as well some child `Facade` class implementations. It also stores the main Segment API methods represented also as `Facade` classes.

`Facade` is designed to provide some type safety for developers and make up for our lack of API enforcement further up in our pipeline.

## `integration/`
This directory stores the `Integration` class from which all integration implementations extends.

The base class has methods for our standard API methods (currently just `track`, `identify`). Integrations are meant to override these methods with their own implementations of those handlers.

The base class also introduces a new method called `subscribe`. This is used by integrations that want to integrate specifically with our Spec events. You can see an example of this API in `examples/`


## `server/`
Finally, the Server class takes an `Integration` in it's constructor and exposes a `listen` method that can be used to start an Express server. This server will listen for and respond to Segment event payloads, proxying the events to the appropriate integration handlers and returning strongly typed response.

⛰
