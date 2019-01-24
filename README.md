# Overview
This is a small POC exploring a potential V2 of the Segment integration "stack". More specifically, it explores a potential v2 of the `facade` library, the integration `Service`, and the base `Integration` class.

# How is it Organized?
There are four main components in the system.

## `spec/`
The `/spec` directory stores a collection of interfaces that define the Segment spec. These interfaces are implemented by `Facade`.

## `facade/`
The `facade` directory stores the base `Facade` class as well some child `Facade` class implementations. It also stores the main Segment API methods represented also as `Facade` classes.

`Facade` is designed to provide some type safety for developers and make up for our lack of API enforcement further up in our pipeline.

## `integration/`
This directory stores the `Integration` class from which all integration implementations extend.

The base class has methods for our standard API methods (currently just `track`, `identify`). Integrations are meant to override these methods with their own implementations.

The base class also introduces a new method called `subscribe`. This is used by integrations that want to integrate with specific Spec events.

## `server/`
Finally, the Server class takes an `Integration` in it's constructor and exposes a `listen` method that can be used to start an Express server. This server will listen for and respond to Segment event payloads, proxying the events to the appropriate integration handlers and returning a strongly typed response.

# Getting Started
```
$ goto integrationSDK
$ yarn build
```

There's a simple example of an integration in the `example/` directory. To run the server and start receiving events, run:

```
$ node dist/example/index.js
$ curl http://localhost:3000 -H "Content-Type: application/json" -d '{"type": "track", "name": "Order Completed", "properties": { "productId": "foo" } }'
```
