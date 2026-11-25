---
title: Policy
slug: /design/policy
---

# Policy

Policy tells each agent how to configure the endpoint and its sensors. It is signed by the Controller, checked by the agent, and applied module by module with a rollback if something fails.

## Levels

A tenant can set policy at five levels:

| Level | Applies to |
|---|---|
| Tenant | Every device of the tenant |
| Group | Devices in a directory group |
| Organisational unit (OU) | Devices in an OU; a child OU overrides its parent |
| Tag | Devices carrying a tag |
| Device | One device |

For each device the levels that apply are combined **in that order**, from broad to specific. A more specific level **replaces** a module set by a broader one (modules are replaced whole, not merged field by field, so the result is easy to predict).

## Locks

A level can lock modules. A locked module cannot be replaced by any more specific level. For example, the tenant level can lock the antivirus settings so that no group or device can weaken them. The preview shows which override a lock blocked.

## Who decides which levels apply

The Controller decides which groups, OUs and tags a device has. A device cannot choose its own, so a compromised computer cannot pick a weaker policy for itself.

## Signed for one device

The Controller signs a separate document for each device. It names the tenant, the device, a revision number and the levels that were combined. An agent accepts a document only if:

1. the signature checks against a key it trusts;
2. the tenant and the device match its own certificate;
3. the revision is not older than the newest it has accepted (no rollback);
4. it is not dated in the future.

A policy copied to another device is therefore refused, and so is a copy of the agent's stored policy on a cloned disk.

## Revisions

Each tenant has one revision counter. Any change to a level, a device's attributes or the rollout settings starts a new revision. An agent that already has the current revision asks again later and receives no new data.

## Administration

Administrators manage policy through the tenant administration API: list, create, replace and delete levels, set a device's groups, OUs and tags, set rollout limits, preview what a device will receive, and read the tenant's audit trail. There are two roles, viewer (read only) and admin. The tenant always comes from the administrator's credentials, never from the request, so other tenants' data is invisible. Every change is written to the audit trail before it is applied; if the trail cannot be written, the change is refused.

Today the API uses access tokens and keeps policy in memory (preview). Sign-in through the identity service, a management screen, durable storage and directory sync of groups and OUs come later.
