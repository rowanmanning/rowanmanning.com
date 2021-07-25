---
# Note metadata
# -------------
noteType: "reply"
title: "Reply on {{ dateFormat "2" .Date | humanize }} {{ dateFormat "January" .Date }} {{ dateFormat "2006 @ 15:04" .Date }}"
date: "{{ .Date }}"
tags: []

# Reply target
# ------------
inReplyTo: "{{ getenv "NOTE_REF_URL" }}"

# Images and resources
# --------------------
# mainImage: "example.jpg"
# resources:
#   - src: "example.jpg"
#     title: "TODO: alt text goes here"
---

TODO: Content goes here.
