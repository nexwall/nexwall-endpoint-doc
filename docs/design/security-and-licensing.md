---
title: Security and licensing
slug: /design/security-and-licensing
---

# Security and licensing

## Security of the product itself

- **Signed everything that changes behaviour**: policy, agent and sensor updates, and rule packs carry signatures that the agent verifies.
- **Staged rollout with rollback**: updates go through rings and can be stopped centrally.
- **Mutual TLS with short-lived certificates** from a Nexwall certificate authority.
- **Tamper resistance in user mode**: restricted service permissions, guards on the agent's files and settings, a watchdog and signed binaries. Nexwall Endpoint does not ship a kernel driver.
- **Least privilege between parts**: sensors have no network access of their own and the agent is the only component that talks to the Controller.
- **Bounded resources**: the on-device spool has a fixed size and a documented drop policy.

## What Nexwall Endpoint does not claim

Nexwall Endpoint is a detection and response product. It relies on the operating system's own protection (for example Microsoft Defender, which it can manage) and does not claim to replace a dedicated next-generation antivirus engine.

## Licence discipline

- Every build runs a **licence gate**: dependencies are scanned, and a licence that conflicts with the product fails the build.
- A **software bill of materials** is produced for each release.
- Open-source components are used unmodified where possible, as separate processes, and source offers are provided where a licence requires them.
- Components that Nexwall forks are tracked from a clean upstream snapshot, with the changes kept separate.
- **Rule attribution**: each detection rule records its author, source and licence, and the information travels with every alert, as the rule licences require.

## Privacy and data location

Event data belongs to the tenant that produced it. The agent connects to a region-specific endpoint so a customer can keep its data in a chosen region, in line with Brazilian data protection law (LGPD).

## Audit log

Enrolments, certificate renewals, revocations and update releases are recorded in an append-only log. Each record contains the hash of the previous record, so changing, deleting, inserting or reordering records is detected. Signed checkpoints, made with a key kept outside the log store, also reveal a log that was cut short. A privileged action is refused when its record cannot be written.
