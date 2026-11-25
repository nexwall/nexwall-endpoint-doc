---
title: Data model
slug: /design/data-model
---

# Data model

Every event leaves the agent in the same wrapper (the envelope) with a payload described by the **Open Cybersecurity Schema Framework (OCSF)**, version 1.10.0. The version is pinned, and class numbers are checked by automated tests.

## Envelope

| Field | Meaning |
|---|---|
| `schema_version` | Version of the envelope itself |
| `tenant_id`, `device_id` | Set by the agent from its certificate. Sensors cannot set them, and the Controller rejects events that disagree with the certificate |
| `sensor` | Which sensor produced the event |
| `ocsf_class_uid`, `ocsf_version` | The OCSF class of the payload and the pinned version |
| `time_unix_nano` | Event time |
| `attribution` | Rule id, author, source and licence for rule-based detections |
| `payload` | The OCSF object |

## Classes mapped so far

| Class | OCSF class uid | Status |
|---|---|---|
| Process activity | 1007 | Implemented |
| File activity | 1001 | Implemented |
| Network activity | 4001 | Implemented |
| DNS activity | 4003 | Implemented |
| Registry key and value activity | 201001, 201002 | Implemented |
| Module activity | 1005 | Implemented |
| Memory activity | 1004 | Implemented |
| Authentication | 3002 | Implemented |
| Detection finding | 2004 | Implemented |
| Vulnerability finding | 2002 | Implemented; produced by the agent on Linux from installed packages and a signed advisory feed when the tenant policy enables it |
| Compliance finding | 2003 | Implemented; produced by the agent from policy drift |
| Device inventory | 5001 | Implemented; produced by the agent when the tenant policy enables it |

Rules that apply to every mapper: an event without a time or without its subject (a path, a user, a finding id) is refused instead of being sent half empty; a value the sensor cannot express becomes "unknown" rather than a guess; and the tenant and device are never set by the mapper, only by the agent and the Controller from the certificate. The registry classes belong to the OCSF Windows extension.

The posture classes are stricter still: a malformed identifier, score, address or over-long text refuses the whole event with an error that names the field, and a fact the scanner does not know (for example whether a fix exists) is left out instead of being sent as "false". Device inventory contains host names, addresses and hardware identifiers, so the agent collects and sends it only after the tenant policy turns it on; compliance findings follow one issue from creation to closure and are sent only when something changes.

## Example

A process launch, as the payload of an envelope (values are illustrative):

```json
{
  "class_uid": 1007,
  "category_uid": 1,
  "activity_id": 1,
  "type_uid": 100701,
  "severity_id": 1,
  "time": 1795000000000,
  "metadata": { "version": "1.10.0", "product": { "name": "Nexwall Endpoint", "vendor_name": "Nexwall" } },
  "process": {
    "pid": 4242,
    "name": "example.exe",
    "cmd_line": "example.exe --option",
    "file": { "path": "C:\\Tools\\example.exe", "name": "example.exe" },
    "user": { "name": "SYSTEM" },
    "parent_process": { "pid": 800, "name": "services.exe" }
  }
}
```

## Why OCSF

A single schema lets detections, searches, dashboards and reports work the same way for every operating system and every sensor, and lets a sensor be replaced without rewriting content.

## Event path

An agent sends events in batches over mutual TLS. The Controller reads the tenant and the device from the certificate, writes them into every event, and publishes each event to a message bus under a subject that contains both. It answers "accepted" only after the bus has stored the event. Retries by the agent are recognised and do not create duplicates.

An indexer reads the bus and stores events in a separate area for each tenant. Before storing, it checks that the tenant and device inside the event match the subject. An event that does not match is moved to a quarantine that only operators can read.
