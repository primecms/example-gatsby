import React from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

import { usePreview } from '../utils/prime';
import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
  query Blog($id: ID!) {
    prime {
      Blog(id: $id) {
        _meta {
          updatedAt
        }
        id
        title
        body
      }
    }
  }
`;

const Blog = (props) => {
  const { prime: { Blog } } = usePreview(props, query);
  return (
    <Layout>
      <SEO title={Blog.title} />
      <time datetime={Blog._meta.updatedAt}>{format(Blog._meta.updatedAt, 'MM/DD/YYYY')}</time>
      <h1>{Blog.title}</h1>
      <ReactMarkdown source={Blog.body} />
      <Link to="/">Go back</Link>
    </Layout>
  );
}

export default Blog
