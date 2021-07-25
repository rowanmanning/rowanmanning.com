---
# Note metadata
# -------------
noteType: "like"
title: "Like on {{ dateFormat "2" .Date | humanize }} {{ dateFormat "January" .Date }} {{ dateFormat "2006 @ 15:04" .Date }}"
date: "{{ .Date }}"
tags: []

# Like target
# -----------
likeOf: "{{ getenv "NOTE_REF_URL" }}"
---
