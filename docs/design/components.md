---
title: Components
slug: /design/components
---

# Components

Nexwall Endpoint is composed of open-source building blocks and Nexwall's own code. The table shows what is used for what, and under which licence.

## On the endpoint

| Part | Role | Origin | Licence |
|---|---|---|---|
| `nx-agent` | Enrolment, policy, updates, spool, health, tamper resistance, response executor | Nexwall (Go) | Proprietary |
| Windows sensor | Behaviour telemetry and rules from Event Tracing for Windows, memory scanning, kill and isolate | Fork of Fibratus | Apache-2.0 |
| Linux sensors | Runtime detection and in-kernel enforcement through eBPF | Tetragon and Falco, packaged unmodified | Apache-2.0 (eBPF programs under GPL-2.0 or a permissive alternative) |
| macOS sensor | Execution and file authorization; telemetry through Apple's Endpoint Security framework | Fork of Santa plus a Nexwall Endpoint Security client | Apache-2.0 |
| Inventory and hunting | Queryable inventory and ad-hoc questions | osquery | Apache-2.0 |
| File integrity, configuration and vulnerability checks | Integrity, compliance baselines | Wazuh agent, unmodified, separate process | GPL-2.0 |
| OS controls | Managed Microsoft Defender, application control, disk encryption and host firewall settings | Operating system | Not redistributed |

Why these: each is mature, widely used and replaceable behind the same local interface, so no single project is a point of failure.

## In the Controller service

| Part | Role | Licence |
|---|---|---|
| Nexwall Endpoint Controller (Go) | API, tenancy, policy, enrolment and certificate authority, response workflows, audit | Proprietary |
| PostgreSQL | Configuration and state | PostgreSQL licence |
| NATS | Event bus between ingestion and the stores | Apache-2.0 |
| OpenSearch | Search and detection storage | Apache-2.0 |
| ClickHouse | Analytics and reporting | Apache-2.0 |
| Vector | Event batching and routing | MPL-2.0 |
| Temporal | Durable response workflows | MIT |
| Logto | Sign-in for people (OpenID Connect) | MPL-2.0 |
| Wazuh manager | Integrity, compliance and vulnerability analysis | GPL-2.0 and AGPL-3.0 for parts, used unmodified |

The server-side set is the target design. The first releases start with a lighter set (PostgreSQL and NATS behind the same event model) and add the search and analytics stores as the product grows.

## Detection content

- Rules on the endpoint come from the sensors' own rule sets and from Nexwall packs.
- Correlation rules use the Sigma format.
- Each rule keeps its author, source and licence, and the attribution is carried into every alert.

## What Nexwall builds itself

The agent, the Controller service, the event envelope and OCSF mappers, the policy and update system, the response logic and the detection packs. See [Data model](data-model.md) and [Identity and tenancy](identity-and-tenancy.md).
