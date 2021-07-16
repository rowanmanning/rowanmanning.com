
# Rowanmanning Hugo Theme

This is the [Hugo](https://gohugo.io/) theme for [Rowan Manning's website](https://rowanmanning.com/). It supports a single author and some light customisation.


## Configuration

You'll need a grasp of how to use Hugo to understand some of these configuration options.

### Authorship

Adding author information to the site config allows for correct attribution of authorship, as well as displaying social links around the site (example is YAML):

```yaml
author:
  name: "Rowan Manning"             # The author name
  url: "https://rowanmanning.com/"  # The author's website
  github: "rowanmanning"            # The author's GitHub username
  twitter: "rowanmanning"           # The author's Twitter handle
```

### Content highlight

Content can be highlighted with colours, which appears in lists of content as well as on post pages. For each post, provide a `highlight` front-matter and specify one of the following colour options:

  - `blue`
  - `cyan`
  - `lime`
  - `orange`
  - `pink`
  - `purple`
  - `yellow`

### Home page hero

The home page hero area can be customised in the main `content/_index.md` file by supplying a map of configurations (example is YAML):

```yaml
hero:
  backgroundColorTop: "#900"     # The gradient top colour (optional)
  backgroundColorBottom: "#060"  # The gradient bottom colour (optional)
  textColor: "#eee"              # The text colour (optional)
```

### Home page tiles

Home page tiles can be customised in the main `content/_index.md` file by supplying an array of `tiles` in the front-matter. You can supply as many tiles as you need. There are two types of tile:

#### List

Display a list of content from a specific site section. Supports the following properties (example is YAML):

```yaml
tiles:
  - type: "list"      # The type of tile (required)
    section: "posts"  # The section to fetch content from (required)
    title: "Blog"     # The title to display (optional), defaults to the section title
    limit: 3          # The number of content items to display (optional), defaults to 3
```

#### Summary

Display a summary for a single page. Supports the following properties (example is YAML):

```yaml
tiles:
  - type: "summary"  # The type of tile (required)
    page: "about"    # The page to fetch summary content for (required)
    title: "About"   # The title to display (optional), defaults to the page title
```

### Main menu

The site supports a limited `main` menu, but does not support nested links. The menu can also contain the following social links if provided in the site configuration ([see Authorship](#authorship))


## License

Licensed under the [GPLv3](LICENSE.md) license.<br/>
Copyright &copy; 2021, Rowan Manning.
