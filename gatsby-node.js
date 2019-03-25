exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions
  
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
}