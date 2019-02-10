import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query Blog($id: ID!) {
    prime {
      Blog(id: $id) {
        id
        title
        body
      }
    }
  }
`;

const Blog = ({ data: { prime: { Blog } } }) => (
  <Layout>
    <SEO title={Blog.title} />
    <h1>{Blog.title}</h1>
    <p>{Blog.body}</p>
    <Link to="/">Go back</Link>
  </Layout>
)

export default Blog
