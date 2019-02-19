# Overview
This is a small POC exploring a potential V2 of the Segment integration "stack". More specifically, it explores a potential v2 of the `facade` library, the integration `Service`, and the base `Integration` class.

# Introduction
The Segment API is more closely aligned with an RPC style API rather than a traditional REST API. API requests to Segment are all uni-directional POST requests. They indicate the occurence of some action or event undertaken by an end-user and often trigger downstream functionality.

The API consists of two endpoints, or "methods" (not to be confused with HTTP Verbs such as GET/POST which are also called methods). These are `/track` and `/identify`

## Track
The `/track` endpoint is used to indicate the occurence of an event of interest that an end user has performed.

## Semantic Events
Most `/track` events are simply custom events that are completely defined by the customer. However, Segment also documents a standardized collection of predefined `/track` events that carry semantic meaning and allow downstream data consumers to build tighter integrations with their own APIs. It can help to imagine the `/track` method as a generic method that can optionally take a semantic event as a type property.

# Segment Integration
Integrating with the Segment API as a downstream consumer involves defining handlers for the event types documented above. The IntegrationSDK provides a framework that helps make this process easier.

## Integration
The `Integration` class is an abstract class. There are three main methods that


## How is it Organized?
There are four main components in the system.

## `spec/`
The `/spec` directory stores a collection of interfaces that define the Segment spec. These interfaces are implemented by `Facade`.

## `facade/`
This directory stores the base `Facade` class as well some child `Facade` class implementations. It also stores the main Segment API methods represented also as `Facade` classes.

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
$ npm build
```

There's a simple example of an integration in the `example/` directory. To run the server and start receiving events, run:

```
$ node dist/example/index.js
$ curl http://localhost:3000 -H "Content-Type: application/json" -d '{"type": "track", "name": "Order Completed", "properties": { "productId": "foo" } }'
```

# Future Work
- Type validation in Facade "getters". Also a way to warn end-users if their types are not compatible with our spec.
- Facade/Spec implementations for `context` object payloads.
- Explore options for "channel" specific integrations (ie. allow integrations to block events from Web or Mobile). This will make defining the `context` type in event handler payloads difficult.
- Better support for integrations to require specific properties for specific events and/or all events. Also a mechanism for communicating those requirements back to the end-user in a standardized way.
- Possible standardization of a `Mapper` class.
