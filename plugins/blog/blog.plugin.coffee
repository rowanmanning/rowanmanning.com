
# Export Plugin
module.exports = (BasePlugin) ->
    class BlogPlugin extends BasePlugin

        # Plugin Name
        name: 'blog'

        # Before everything
        generateBefore: ({}, next) ->

            # Extend default template data with ability to get blog posts by directory
            @docpad.config.templateData.blogPosts = (directory) ->
                posts = []
                for document in @documents
                    if document.url.indexOf('/' + directory + '/') == 0 && document.private != true
                        posts.push document
                return posts

            # Done! On to the next task!
            return next?()
