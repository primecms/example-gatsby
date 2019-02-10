import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    prime {
      allBlog {
        edges {
          node {
            id
            title
            body
          }
        }
      }
    }
  }
`;

const BlogPost = ({ node }) => {
  return (
    <div key={node.id}>
      <h3><Link to={`/blog/${node.id}`}>{node.title}</Link></h3>
    </div>
  );
}

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Blog posts</h1>
    {data.prime.allBlog.edges.map(BlogPost)}
  </Layout>
)

export default IndexPage;