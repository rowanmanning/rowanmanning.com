
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
	@./scripts/fetch-webmentions.js

process-webmentions:
	@./scripts/process-webmentions.js

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
