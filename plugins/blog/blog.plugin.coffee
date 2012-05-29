
# Export Plugin
module.exports = (BasePlugin) ->
    class BlogPlugin extends BasePlugin

        # Plugin Name
        name: 'blog'

        # Before everything
        generateBefore: ({}, next) ->

            # Extend default template data with ability to get blog posts by directory
            @docpad.config.templateData.blogPosts = (directory, count) ->
                posts = []
                for document in @documents
                    if document.url.indexOf('/' + directory + '/') == 0 && document.private != true
                        posts.push document
                if typeof count == 'number' then posts[0...count] else posts

            # Done! On to the next task!
            return next?()
