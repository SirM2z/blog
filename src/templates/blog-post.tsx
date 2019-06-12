import * as React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';
import Layout from '../components/Layout';
import Post from '../components/Post';
import PostDoc from '../components/Post/PostDoc';
import Comment from '../components/Comment';

import { getPostLink } from '../utils/helpers';

interface IPostPageProps {
  location: Location;
  data: {
    markdownRemark: IMarkdownRemarkNode;
  };
  pageContext: {
    id: string;
  };
}

const PostPageTemplate = (props: IPostPageProps) => {
  const { location, data, pageContext } = props;

  const post = data.markdownRemark;
  const postLink = getPostLink(post);
  const postCommentPath = post.fields.slug;
  const title = post.frontmatter.title;

  const postMeta = [{
    name: 'keywords',
    content: post.fields.keywords.join(', '),
  }];

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        slug={postLink}
        meta={postMeta}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Col lg={10}>
            <Post post={data.markdownRemark} />
            <PostDoc post={data.markdownRemark} />
            <Comment path={postCommentPath} title={title} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query GetBlogPost($id: String) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        date(formatString: "YYYY/MM/DD")
        lastmod(formatString: "YYYY/MM/DD")
        author
        tags
        # issueId
      }
      headings {
        value,
        depth
      }
      fields {
        slug
        keywords,
      }
      excerpt(truncate: true)
      html
      timeToRead
    }
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`;

export default PostPageTemplate;
