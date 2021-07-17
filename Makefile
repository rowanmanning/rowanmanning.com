
# Reusable Makefile
# ------------------------------------------------------------------------
# This section of the Makefile should not be modified, it includes
# commands from my reusable Makefile: https://github.com/rowanmanning/make
include node_modules/@rowanmanning/make/javascript/index.mk
# [edit below this line]
# ------------------------------------------------------------------------

start:
	@hugo server

start-dev:
	@hugo server -D

fetch-webmentions:
	@./scripts/fetch-webmentions.js

process-webmentions:
	@./scripts/process-webmentions.js

build: process-webmentions
	@hugo --minify --environment production

build-staging: process-webmentions
	@hugo --minify --environment staging

test-theme:
	@cd themes/rowanmanning && make test-integration
