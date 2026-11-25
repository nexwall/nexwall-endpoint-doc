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
| OCSF 1.10.0 event envelope and mappers for process, file, network, DNS, registry, module, memory, sign-in, detection, vulnerability, compliance and device-inventory events | Working, covered by tests; the sensors that feed several of the classes are not connected yet |
| Device inventory and policy-drift compliance findings produced by the agent itself | Working on Linux (reads the machine directly); Windows and macOS give less detail until their adapters are written |
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
| Tamper-evident audit log (hash chain per tenant, signed checkpoints, append-only in the database); privileged actions are refused if they cannot be recorded | Working in the lab; tenants verify their own trail on the server or offline (nx-auditverify) |
| Update service: signed manifests, ring-by-ring release, stop switch, stored in the database, operator-only publishing | Working; releases survive restarts and are shared by all Controllers; applied by a lab installer only |
| Durable event pipeline: acknowledged only after the message bus stored the event, tenant stamped from the certificate, per-tenant indexing, quarantine for mismatches | Working in a development mode; stored in files |
| Cross-tenant test suite and fuzz tests on the ingestion path | Working; reports and search not built yet |
| Sign-in to the administration API with identity-provider (OIDC) access tokens, strictly verified | Working; tested against a local test issuer, not yet against a live Logto |
| Vulnerability findings from installed Linux software (dpkg, RPM, apk) matched against a signed advisory feed; one finding per advisory, opened, updated and closed as packages change | Working on Linux; Windows (registered programs) and macOS (application bundles) readers are built and unit-tested, with a strict numeric version format, but not yet run on a real Windows or macOS device; no advisory content ships yet, the feed is delivered through the update channel in stages (own signing key, checked before and after install); per-user Windows programs and language package ecosystems are not covered |
| Active Directory sync: the nx-dirsync program reads computers, security groups (nested ones included) and OUs over LDAP and pushes a guarded snapshot, so group and OU scopes in policy follow the directory; devices are matched by enrolment-token label or a mapping file | Working against a simulated directory; not yet tested on a real domain controller; Microsoft Entra ID (devices and security groups through Graph, read-only application) works the same way, tested against a simulated Graph only |
| Separate signing service for the policy, update and audit keys (mutual TLS, per-client key access, pinned public keys, fail-closed, audited actions never blocked by an outage) | Working with keys held as files on the signing host; hardware or cloud key storage and the agent certificate authority key are not moved yet |
| Directory sync of groups and OUs into policy (snapshot API, one revision, manual and directory values kept apart) | Working; the Active Directory and Entra ID connectors are not built yet |
| Event storage in OpenSearch and ClickHouse (one index or key range per tenant, fixed mappings an agent cannot grow, repeatable writes, ordered paging) | Working; tested against real servers in the lab; the tenant read API, retention rules and message-bus per-tenant access are not built yet |
| Event search through the administration API (own organisation only, filter by device and time, paged, fails closed) | Working; free-text search and the web screens are not built yet |
| Event retention per organisation (daily clean-up with a report-first mode, a minimum period, keep-forever, and complete erasure on request) | Working against real OpenSearch and ClickHouse in the lab; periods are set in an operator file, not yet in the portal |
| Secure message-bus connections (TLS, credentials, least-privilege accounts for the Controller and the indexer) | Working against a real NATS server with TLS and mutual TLS in the lab |
| Licence gate in every build | Working |

## Planned

- Sensors for Linux and macOS, and more Windows versions
- The vulnerability scanner that feeds the vulnerability finding class (package inventory plus advisories)
- Installers that replace the running agent on each operating system
- The management portal and the tenant search and reports on top of the event stores
- The firewall isolation loop, and measurement of its speed
- Detection content packs and managed detection services

Nothing on this page is a commitment to a date. A list of tested operating systems will be published with the first release.
