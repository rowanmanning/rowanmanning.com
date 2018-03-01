
# Meta tasks
# ----------

.PHONY: test


# Output helpers
# --------------

TASK_DONE = echo "✓ $@ done"


# Install tasks
# -------------

# Clean the Git repository
clean:
	@git clean -fxd
	@$(TASK_DONE)

# Install dependencies
install:
	@bundle install
	@$(TASK_DONE)


# Build and deploy tasks
# ----------------------

# Build the site ready for production
build:
	@bundle exec jekyll build
	@$(TASK_DONE)

# Deploy the site to S3
deploy: build
ifndef AWS_ACCESS_KEY_ID
	$(error AWS_ACCESS_KEY_ID is not set)
endif
ifndef AWS_SECRET_ACCESS_KEY
	$(error AWS_SECRET_ACCESS_KEY is not set)
endif
	@bundle exec s3_website push
	@$(TASK_DONE)


# Local development tasks
# -----------------------

# Serve the site for local development
serve:
	@bundle exec jekyll serve --watch --drafts
