const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogTemplate = path.resolve(`src/templates/blog.js`);
    resolve(
      graphql(
        `
          query {
            prime {
              allBlog {
                edges {
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.prime.allBlog.edges.forEach(({ node }) => {
          createPage({
            path: `/blog/${node.id}`,
            component: blogTemplate,
            context: node
          });
        });
      })
    );
  });
};
