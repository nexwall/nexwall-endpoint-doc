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

Enrolments, certificate renewals, revocations, policy and administration changes and update releases are recorded in an append-only log. In production it is kept in the database, one chain of records per tenant, so several Controllers share it and a tenant never sees anything of another tenant's chain, not even a hash. Each record contains the hash of the previous record of its chain, so changing, deleting, inserting or reordering records is detected.

The database itself refuses to change or delete records. Because someone with full database rights could remove that protection, there are independent checks: the head of each chain is kept beside it and must match the last record, and signed checkpoints, made with a key kept outside the database, reveal a log that was edited, cut short or emptied. Checkpoints are written every hundred records, every minute for chains that grew, and when the Controller stops. An operator verifies a tenant's chain with one command.

A privileged action is refused when its record cannot be written. For actions where the person is shown a secret once, such as creating an enrolment token, the record names the token by an identifier and never contains the secret.

## Keys and how the Controller starts

Four keys sign what agents and auditors rely on: the certificate authority for agents, the policy key, the update key and the audit key. They are created once, offline, in a new directory; the tool refuses to overwrite an existing set. A production Controller reads them from files that only its owner can read and refuses to start otherwise. It also refuses to start without a database, so it never keeps policy, devices or revocations only in memory, and it never creates keys on its own. Each key has an identifier derived from its public half, so a key change is visible to agents.

The update key is not on the Controller hosts at all. Releases are published, widened ring by ring, halted and resumed by an operator who holds the key and the database owner credentials; the Controller's own database role can only read releases, so a compromised Controller cannot push an update or lift the stop switch. Every such action is written to the audit log before it takes effect.

Keeping keys in files is a first step. Before release they move to a hardware or cloud key service, so that nobody who can read the Controller host can sign certificates or policy.
