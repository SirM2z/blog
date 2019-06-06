const nodejieba = require('nodejieba');
const format = require('date-fns/format');
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const { frontmatter } = node;
    const year = format(frontmatter.date, 'YYYY');
    const month = format(frontmatter.date, 'MM');
    // const slug = `/post/${date}`;
    const slug = `/post/${year}/${month}${createFilePath({ node, getNode, basePath: `src/content/posts` })}`
    // console.log(slug);
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    let keywords = nodejieba.extract(frontmatter.title, 2).map(({ word }) => word.toLowerCase());
    keywords = frontmatter.tags.reduce((words, tag) => {
      const word = tag.toLowerCase();
      if (!words.includes(word)) {
        words.push(word);
      }
      return words;
    }, keywords);
    createNodeField({
      node,
      name: 'keywords',
      value: keywords,
    });
  }
};
