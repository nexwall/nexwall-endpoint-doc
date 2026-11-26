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
| Install on one Linux server, encrypted backup and restore to a new server, upgrade with automatic rollback, health and metrics, support bundles without secrets | Working in the lab on Debian 12; other distributions not tested |
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
| Linux agent packages (DEB and RPM, amd64 and arm64): silent install with a one-time enrolment token, hardened service, reproducible build | Working in the lab (real enrolment through the installed launcher); not yet signed, not yet tried on the full distribution matrix; Windows and macOS installers not built |
| Linux agent self-update: signed release checked, installed, restarted, confirmed by contact with the Controller; automatic rollback, failed release never retried | Working in the lab (real launcher and binaries, three scenarios); not yet tried under real systemd on the distribution matrix; Windows and macOS not built |
| Agent release streams in the administration API (read only; publishing stays with operators) | Working in the lab; no portal screen yet |
| Load test tool with simulated endpoints (`nx-loadgen`), exact loss measurement | Lab run: 10,000 endpoints enrolled, about 400,000 events, none lost or duplicated, on one development Controller; production stores, several Controllers, the 30-day soak and 50,000 endpoints are not yet tested |
| Software bill of materials per shipped program and operating system, third-party licence notices in the Linux packages, checked before release | Working for the Go programs; not signed yet; Falco, Tetragon, osquery and Wazuh are added when they are packaged |
| Licence gate in every build | Working |
| Linux sensors: osquery (processes, network connections, listening ports, logins, file integrity) and Falco (runtime detections), as separate supervised processes behind the sensor interface, packaged as the optional `nexwall-agent-sensors` DEB/RPM with pinned upstream versions | Lab run on one Linux host: events reach the store within a minute, stamped with tenant and device; osquery killed 100 times and Falco 20 times, the agent keeps running; every event checked against the OCSF 1.10.0 definitions (101 of 101 valid). A 24-hour capture is running; installation on three distributions, arm64 and package signing are not yet done |
| Alerts from detections: grouped per machine and rule, with severity, ATT&CK technique and rule source and licence; acknowledge and resolve through the administration API; delivery by e-mail (TLS required) and signed webhook with retry, per-customer routes, separate `nx-alerter` service | Lab run: alert and both deliveries within a second of a real Falco detection, a failing receiver retried, nothing lost while the alerter was stopped; real mail provider not tested; no console screen yet |
| Response actions on Linux: isolate and release a machine (nftables, ends by itself, survives agent restart and reboot), stop a process tree, quarantine a file, collect process list; destructive actions need a named approver (second person optional), idempotent requests, signed expiring orders bound to one machine and customer, local tamper-evident log, full audit | Lab run on Debian 12 with real nftables: 13 checks passed; isolation 11.9 s at the 95th percentile over 100 runs (worst 12.1 s, target 30 s); the firewall leg is a later release (MR3); no console screen yet; Windows later |
| Administration console in the browser (served by the Controller): devices, event search, alerts, isolation requests and approvals, enrolment tokens with install instructions, endpoint protection settings, audit verification, English and Brazilian Portuguese; sign-in with an API token | Lab run with a real browser against a real Controller and two tenants: no data from the other tenant on any screen, strict page security policy; single sign-on is not built |
| Endpoint protection settings per tenant, group or device (off, monitor, enforce): all six are now applied on Linux: host firewall, USB storage control (kept true between changes), exclusions on the machine and in the alert engine, threat settings in the alert engine (isolation is only ever requested, a person approves), application-control alerts (no blocking), and web protection at address level for exact domains plus alerts for listed names (no categories); each machine reports what it really does; a setting removed from the policy is switched off; unsafe settings are refused when saved | Lab run: a real agent in a network namespace applied the firewall from the console policy within seconds; an unlisted program raised an alert, the address of a denied domain was dropped, an excluded program's events stopped, and removing a setting removed its rules |
| Windows endpoint: service and MSI, self-update with rollback, sensor (Fibratus), protection settings (Windows Firewall, USB, web deny-list, exclusions, application-control findings), response actions, telemetry-gap alert | Working in the lab on Windows 10; unsigned installer, application control reports only, web protection by IP |
| Per-tenant device limit and end of term at enrolment, set by the operator | Working, tested on the in-memory store and PostgreSQL |

## Planned

- Sensors for Linux and macOS, and more Windows versions
- The vulnerability scanner that feeds the vulnerability finding class (package inventory plus advisories)
- Installers that replace the running agent on each operating system
- Reports on top of the event stores and the partner portal
- The firewall isolation loop (release 3; the agent side of isolation is measured and working)
- Detection content packs and managed detection services

Nothing on this page is a commitment to a date. A list of tested operating systems will be published with the first release.

## Release path

Work is organised in three releases, each defined by what a customer can do with it, not by a date:

- **First release candidate:** detect and contain on Linux, installable in a lab and on one test server. Telemetry from open sensors, alerts by e-mail and webhook, a console, endpoint protection settings, and isolation of a machine. Windows is part of the same candidate (service, installer, update with rollback, protection settings, response actions, tested in the lab on Windows 10; unsigned); the firewall leg is a later release (MR3).
- **Release 1:** managed operations. Windows prevention controls, macOS, an approval-based response engine, cases, white-label reports, partner-portal and licensing integration, a 500-endpoint pilot.
- **Release 2:** XDR and assurance. Correlation of endpoint and firewall events, a threat-intelligence bus, additional protection modules, network sensors, an external penetration test and long soak tests.

Nothing on this page is a commitment to a date.
