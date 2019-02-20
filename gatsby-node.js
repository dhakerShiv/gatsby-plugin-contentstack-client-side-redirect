const { StaticQuery, graphql } = require("gatsby")

exports.createPages = async ({ graphql, actions }) => {
  const {createRedirect} = actions
  
  let response = await graphql(`
  query redirects {
    contentstackRedirects {
      urls_mapping {
        old_url
        new_url
      }
    }
  }`)

  let urls_mapping = response.data.contentstackRedirects.urls_mapping
  
  if (urls_mapping)
  {
    urls_mapping.forEach(urls => {
      createRedirect({ fromPath: urls.old_url, toPath: urls.new_url, isPermanent: true })
    })
  }

}