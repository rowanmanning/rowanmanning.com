---
# Note metadata
# -------------
noteType: "bookmark"
title: "Bookmark on {{ dateFormat "2" .Date | humanize }} {{ dateFormat "January" .Date }} {{ dateFormat "2006 @ 15:04" .Date }}"
date: "{{ .Date }}"
tags: []

# Bookmark target
# ---------------
bookmarkOf: "{{ getenv "NOTE_REF_URL" }}"
---
