
# Default target
all: deps sass build

# Install dependencies
deps:
	@echo "Installing dependencies..."
	@bower install

# Create expanded and minified CSS from Sass
sass: minify-sass compile-sass

# Create minified CSS from Sass
minify-sass: compile-sass
	@echo "Minifying CSS..."
	@sass ./asset/style/source/site.scss --style compressed > "./asset/style/site.min.css"
	@echo "  > Done"

# Create CSS from Sass
compile-sass:
	@echo "Compiling Sass to CSS..."
	@sass ./asset/style/source/site.scss --style expanded > "./asset/style/site.css"
	@echo "  > Done"

# Watch Sass
watch-sass:
	@echo "Watching Sass for changes..."
	@sass --watch --style compressed ./asset/style/source/site.scss:./asset/style/site.min.css

# Build the site
build:
	@echo "Building site..."
	@jekyll build
	@echo "  > Done"
