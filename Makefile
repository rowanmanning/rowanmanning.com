
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
	@hugo server -D --disableFastRender

fetch-webmentions:
	@./scripts/site.js wm:fetch --api-key $(WEBMENTION_API_KEY)

process-webmentions:
	@./scripts/site.js wm:process

build: process-webmentions
	@hugo --minify --environment production

build-staging: process-webmentions
	@hugo --minify --environment staging

# Run the theme tests using mocha
test-theme:
	@if [ -d themes/rowanmanning/test/integration ]; then make _test-theme-run && $(TASK_DONE); fi
_test-theme-run:
	@if [ -x $(NPM_BIN)/mocha ]; then make _test-theme-run-mocha; fi
_test-theme-run-mocha:
	@mocha "themes/rowanmanning/test/integration/**/*.test.js" --recursive --timeout $(INTEGRATION_TIMEOUT) --slow $(INTEGRATION_SLOW) $(INTEGRATION_TEST_MOCHA_FLAGS)

new-weeknote:
	@./scripts/site.js weeknote:create

new-bookmark:
	@./scripts/site.js note:create --type bookmark $(URL)

new-like:
	@./scripts/site.js note:create --type like $(URL)

new-note:
	@./scripts/site.js note:create --type note

new-reply:
	@./scripts/site.js note:create --type reply $(URL)

new-repost:
	@./scripts/site.js note:create --type repost $(URL)
