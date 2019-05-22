'use strict';

require('source-map-support').install();
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
});

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Ryan's Blog`,
    author: 'Ryan',
    description: 'Personal blog by Ryan.',
    siteUrl: 'https://www.ryanc.top',
    since: 2015,
    twitter: '@mrz_5',
    menu: [
      // { name: '首页', path: '/' },
      // { name: '关于我', path: '/about' },
      { name: '搜索', path: '/search', header: true },
      { name: 'Wiki', path: 'https://sirm2z.github.io/wiki', header: false },
      { name: 'RSS', path: 'https://www.ryanc.top/atom.xml', header: false },
    ],
    socials: [
      { name: 'Github', link: 'https://github.com/sirm2z' },
      // { name: 'Twitter', link: 'https://twitter.com/mrz_5' },
    ],
    friends: [
      // { name: '', link: '' },
    ],
    valine: {
      enable: true,
      appId: 'VjE2tE7PFKE9FNnTgs8NQJpz-gzGzoHsz',
      appKey: 'Q4nFUmeVChxdeC7PRGGKq3eQ',
      notify: false, // mail notifier , https://github.com/xCss/Valine/wiki
      verify: true, // Verification code
      avatar: 'robohash',
      placeholder: '说点什么吧...',
      visitor: true,
    }
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: 'markdown-posts',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-140679869-1',
        optimizeId: 'GTM-NRXGPM5',
      },
    },
    {
      resolve: 'gatsby-plugin-baidu-analytics',
      options: {
        siteId: '352a30743e53535dc780a5850c8b576c',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ryan's Blog`,
        short_name: `Ryan's Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#FA7268`,
        display: 'standalone',
        icon: `src/assets/icon.png`,
        theme_color_in_head: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/page/*', `/search`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/atom.xml',
            title: "Ryan's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              maintainCase: true,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-jss',
      options: {
        theme: require('./src/styles/theme.ts'),
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
  ],
};
