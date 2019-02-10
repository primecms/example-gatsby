import React from "react"
import { Link, graphql } from "gatsby"
import { format } from 'date-fns';

import { usePreview } from '../utils/prime';
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query {
    prime {
      allBlog {
        edges {
          node {
            _meta {
              updatedAt
            }
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
      <time dateTime={node._meta.updatedAt}>{format(node._meta.updatedAt, 'MM/DD/YYYY')}</time>
      <h3><Link to={`/blog/${node.id}`}>{node.title}</Link></h3>
    </div>
  );
}

const IndexPage = (props) => {
  const { prime: { allBlog } } = usePreview(props, query);

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Blog posts</h1>
      {allBlog.edges.map(BlogPost)}
    </Layout>
  );
}

export default IndexPage;