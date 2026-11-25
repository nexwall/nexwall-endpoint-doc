---
title: APIs
slug: /design/api
---

# APIs

Nexwall Endpoint has two interfaces served by the Controller. Both are described by OpenAPI 3.1 documents, and the build fails if a document and the running code disagree about which routes exist or who may call them.

- [Agent API](/api/openapi-agent.json): used by the agent over TLS 1.3 with its client certificate.
- [Administration API](/api/openapi-admin.json): used by tenant administrators with a bearer token, on a separate listener.

Both are in preview: the contract may change before release.

## Agent API

| Call | Purpose |
|---|---|
| `POST /v1/enrol` | Exchange a single-use token and a certificate request for a client certificate |
| `POST /v1/renew` | Renew the certificate with a new key, after half of its lifetime |
| `POST /v1/events`, `POST /v1/events/batch` | Send events. Accepted only after the message bus has stored them. A batch is refused as a whole if any event names another tenant or device |
| `GET /v1/policy` | Fetch the signed policy document for this device |
| `GET /v1/update/manifest`, `GET /v1/update/artifact/{sum}` | Fetch the signed update manifest and artifacts |

The tenant and the device come only from the certificate. A body that names a different identity, even with a look-alike key, is refused with 403.

## Administration API

| Area | Calls |
|---|---|
| Policy | Layers for the tenant, group, OU, tag and device; rollout settings; a preview of the policy one device will receive |
| Devices | List and read enrolled devices; set groups, OUs and tags; revoke a device |
| Directory | Apply a snapshot of device groups and OUs coming from a directory (Active Directory, Entra ID) in one revision |
| Enrolment | Issue, list and withdraw single-use enrolment tokens (the secret is shown once) |
| Audit | Read the tenant's audit chain, the public key that signs its checkpoints, the signed checkpoints, and a server-side verification of the chain |

Every call is scoped to the tenant of the token. The tenant is never in a URL or body, and another tenant's objects answer "not found". A viewer token can read; only an administrator token can change anything. Every change is recorded in the audit log before it is made, and again with its result; if the record cannot be written, nothing changes. If the database is unavailable the answer is 503 and nothing changes.

### Verifying the audit trail

A tenant does not have to take the Controller's word that its audit trail is intact. The checkpoint public key is published through the API (keep a copy obtained out of band), and the records and the signed checkpoints can be downloaded. The `nx-auditverify` tool recomputes every hash, every link between records and every signature, and reports a trail that was edited, had records removed or has no signed checkpoint. The Controller can also check the chain on request; tampering is reported as a failed verification, and an unreadable store is reported as an error, never as success. Records newer than the last checkpoint are linked but are signed only by the next checkpoint, written within a minute of activity. Only the calling tenant's chain is ever checked; the chain of platform actions is not exposed. Available on production Controllers.

### Authentication of administrators

Two kinds of bearer credential are accepted on the administration listener: static administrator tokens (the Controller stores only a SHA-256) and, when configured, JWT access tokens from the partner portal's OpenID Connect provider (Logto). For the second kind the Controller verifies the signature against the provider's published keys (RS256, ES256 or EdDSA, the algorithm taken from the key), the issuer, the audience and the expiry, and takes the tenant and the role from exact claims. A token without a valid tenant or role is refused; there is no default tenant or role. The audit log records the actor as `oidc:` plus the provider's subject, so people can be told apart from static tokens.
