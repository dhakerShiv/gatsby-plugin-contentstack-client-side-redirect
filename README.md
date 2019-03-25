# gatsby-plugin-contentstack-client-side-redirect

Generates client side redirect html files for redirecting on any static site host like s3 or netlify.

It uses `window.location.href = url` for redirection and `createRedirect` action provided by Gatsby

## Install

```sh
npm install --save gatsby-plugin-contentstack-client-side-redirect
```

## How to use

```js
//  Register this plugin in gatsby-config.js
plugins: [
  `gatsby-plugin-contentstack-client-side-redirect`,
  `gatsby-plugin-client-side-redirect` // make sure to put last in the array
];
```

For contentstack specific only -

Steps - 

  1. Create a contenttype named as `Redirects`
  2. Create a group named as urls_mapping inside `Redirects` contenttype
  3. Create two text fields as `old_url` and `new_url` and save it
  4. Now enter pairs of old and new urls for redirection!

Have a look at the code if you are interested :)

```
const response = await graphql(`
query redirects {
  allContentstackRedirects {
    edges {
      node {
        urls_mapping {
          old_url
          new_url
        }
      }
    }
  }
}`)

const allEntries = response.data.allContentstackRedirects.edges
let urls

if (allEntries)
{
  allEntries.forEach(entry => {
    urls = entry.node.urls_mapping

    if (urls)
    {
      createRedirect({ fromPath: urls.old_url, toPath: urls.new_url, isPermanent: true })
    }
  })
}

```
