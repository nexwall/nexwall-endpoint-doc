---
title: Overview
slug: /design/overview
---

# Nexwall Endpoint overview

:::caution Development preview
Nexwall Endpoint is under development and has not been released. This page describes the design. Anything marked as a target is a goal that has not been measured yet. The [Status](status.md) page lists what has been built and verified.
:::

Nexwall Endpoint is an endpoint detection and response (EDR) product, with extended detection (XDR) and managed detection and response (MDR) services built on top. It is designed to work together with Nexwall Firewall: the endpoint sees what happens on the device, the firewall controls the network around it, and each can act on what the other finds.

## Design principles

- **Compose proven parts, own the core.** Mature open-source sensors do the low-level observation on each operating system. Nexwall owns the parts that carry safety, tenancy and differentiation: the agent, the Controller service, the data model, the detection content and the response logic.
- **Sensors are separate processes.** A sensor can crash, be updated or be replaced without touching the agent or the Controller service.
- **No custom kernel driver.** Nexwall Endpoint uses the operating systems' own supported telemetry interfaces (event tracing on Windows, eBPF on Linux, Endpoint Security on macOS) and does not ship its own kernel driver.
- **One event model.** Every sensor's output is described with the Open Cybersecurity Schema Framework (OCSF), so detections, searches and reports do not depend on which sensor produced an event.
- **Tenant isolation by construction.** The tenant of an event comes from the device's certificate, never from the content of the event.
- **Everything is attributable.** Each detection rule keeps its author, source and licence, and every build checks the licences of what it ships.

## What it does

| Capability | Summary |
|---|---|
| Telemetry | Process, file, network, DNS, registry and module activity from Windows, Linux and macOS endpoints |
| Detection | Behaviour rules on the endpoint for low latency, and correlation rules in the Controller service |
| Inventory and hunting | Queryable device inventory and on-demand questions across the fleet |
| Policy | Signed policy delivered to every agent, with per-setting compliance reporting |
| Response | Approved actions such as isolating a device, stopping a process or collecting evidence |
| Network loop | Isolation of a compromised device at the firewall, in parallel with isolation on the device |
| Updates | Staged agent and rule updates with signed manifests and rollback |
| Tenancy | One tenant per customer, with a managed-service model for partners |

Read on: [Architecture](architecture.md).
