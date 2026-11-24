---
title: Status
slug: /design/status
---

# Status

Nexwall Endpoint is in development. Progress is published in the [release notes](https://github.com/nexwall/nexwall-endpoint-releasenotes). This page summarises it in the same terms.

## Built and verified in the lab

| Area | State |
|---|---|
| Enrolment with a single-use token and a tenant-bound certificate | Working on Windows 10 22H2 and Linux |
| Mutual TLS ingestion that rejects events of another tenant | Working in a development mode |
| OCSF 1.10.0 event envelope and mappers for process, file, network and DNS activity | Working, covered by tests |
| Windows sensor | Stock behaviour rules fire in the lab; a 25-minute soak test ran without a crash |
| Signed policy: verification, anti-rollback, per-module apply with rollback, compliance report | Working on Windows 10 and Linux |
| Agent-to-sensor local channel (gRPC over a local pipe or socket, restricted to system and administrators) | Working on Windows 10 and Linux |
| Durable event queue on disk, bounded, at-least-once delivery | Working; delivery after an outage verified end to end |
| Batch ingestion that refuses a whole batch if any event names another tenant | Working in a development mode |
| Staged updates: signed manifests, rings, stop switch, health-checked install with rollback | Agent logic done and tested; no update service or installer yet |
| Licence gate in every build | Working |

## Planned

- Sensors for Linux and macOS, and more Windows versions
- Remaining OCSF classes
- Update service, installers and certificate renewal
- Persistent central storage, the data pipeline and the management portal
- The firewall isolation loop, and measurement of its speed
- Detection content packs and managed detection services

Nothing on this page is a commitment to a date. A list of tested operating systems will be published with the first release.
