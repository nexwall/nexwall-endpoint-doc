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
| OCSF 1.10.0 event envelope and mappers for process, file, network, DNS, registry, module, memory, sign-in and detection-finding events | Working, covered by tests; the sensors that feed the newer classes are not connected yet |
| Windows sensor | Stock behaviour rules fire in the lab; a 25-minute soak test ran without a crash |
| Signed policy: verification, anti-rollback, per-module apply with rollback, compliance report | Working on Windows 10 and Linux |
| Policy by tenant, group, OU, tag and device with locks, signed per device, tenant administration API | Working in a development mode; access tokens only |
| Policy, device attributes, device records, enrolment tokens, revocations and the audit log in PostgreSQL with forced row-level security | Working in the lab |
| Controller production start: offline key ceremony, key files readable only by their owner, database required, no generated keys | Working in the lab; keys move to a hardware or cloud key service before release |
| Tenant administrators create enrolment tokens, list devices and revoke a device | Working in a development mode; access tokens only |
| Agent-to-sensor local channel (gRPC over a local pipe or socket, restricted to system and administrators) | Working on Windows 10 and Linux |
| Agent supervises sensor programs, forwards their events and pushes each sensor its part of the policy | Working with a test sensor; production sensors not connected yet |
| Durable event queue on disk, bounded, at-least-once delivery | Working; delivery after an outage verified end to end |
| Batch ingestion that refuses a whole batch if any event names another tenant | Working in a development mode |
| Staged updates: signed manifests, rings, stop switch, health-checked install with rollback | Agent logic done and tested; no update service or installer yet |
| Short-lived certificates with renewal and key rotation; revocation of a device or a tenant | Working in a development mode |
| Tamper-evident audit log (hash chain per tenant, signed checkpoints, append-only in the database); privileged actions are refused if they cannot be recorded | Working in the lab; tenants cannot verify their own trail yet |
| Update service: signed manifests, ring-by-ring release, stop switch, stored in the database, operator-only publishing | Working; releases survive restarts and are shared by all Controllers; applied by a lab installer only |
| Durable event pipeline: acknowledged only after the message bus stored the event, tenant stamped from the certificate, per-tenant indexing, quarantine for mismatches | Working in a development mode; stored in files |
| Cross-tenant test suite and fuzz tests on the ingestion path | Working; reports and search not built yet |
| Sign-in to the administration API with identity-provider (OIDC) access tokens, strictly verified | Working; tested against a local test issuer, not yet against a live Logto |
| Licence gate in every build | Working |

## Planned

- Sensors for Linux and macOS, and more Windows versions
- Remaining OCSF classes (vulnerability, compliance, device inventory)
- Installers that replace the running agent on each operating system
- Search and analytics stores (OpenSearch, ClickHouse) and the management portal
- The firewall isolation loop, and measurement of its speed
- Detection content packs and managed detection services

Nothing on this page is a commitment to a date. A list of tested operating systems will be published with the first release.
