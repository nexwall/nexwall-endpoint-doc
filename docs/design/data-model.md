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
| `tenant_id`, `device_id` | Set by the agent from its certificate. Sensors cannot set them, and Central rejects events that disagree with the certificate |
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
| Registry key and value activity | 201001, 201002 | Planned |
| Module activity | 1005 | Planned |
| Memory activity | 1004 | Planned |
| Detection, vulnerability and compliance findings | 2004, 2002, 2003 | Planned |
| Device inventory | 5001 | Planned |

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
