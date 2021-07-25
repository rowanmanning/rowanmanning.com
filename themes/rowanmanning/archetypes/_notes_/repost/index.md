---
# Note metadata
# -------------
noteType: "repost"
title: "Repost on {{ dateFormat "2" .Date | humanize }} {{ dateFormat "January" .Date }} {{ dateFormat "2006 @ 15:04" .Date }}"
date: "{{ .Date }}"
tags: []

# Repost target
# -------------
repostOf: "{{ getenv "NOTE_REF_URL" }}"
---
