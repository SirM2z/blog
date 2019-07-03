import * as React from 'react';
import { Link } from 'gatsby';
import withStyles, { WithSheet } from 'react-jss';
import Color from 'color';

import PostContext, { IPostContext } from './context';

const styles = (theme: any) => ({
  excerpt: {
    margin: '10px 0 20px',
    color: Color(theme.blackColor).lighten(0.75).hex(),
    fontSize: '1em',
  },
  readMore: {
    fontSize: '16px',
    color: theme.themeColor,
  },
  link: {
    color: 'inherit',
    boxShadow: 'none',
    '&:hover': {
      color: Color(theme.themeColor).lighten(0.05).hex(),
    },
  },
  markdown: {
    overflow: 'hidden',
    '& h1': {
      fontSize: '26px',
      margin: '17.5px 0',
    },
    '& h2': {
      fontSize: '24px',
      margin: '20px 0',
    },
    '& h3': {
      fontSize: '20px',
      margin: '20px 0',
    },
    '& p': {
      margin: '16px 0',
    },
    '& blockquote': {
      marginLeft: '0',
    },
    '& code': {
      fontSize: '0.85em',
    },
    '& .anchor': {
      boxShadow: 'none',
    },
    '& .gatsby-highlight': {
      margin: '16px 0',
      '& pre': {
        borderRadius: '5px',
      },
    },
    '& img': {
      maxHeight: '500px',
      marginLeft: '50%',
      transform: 'translateX(-50%)',
    },
    '& ul': {
      marginLeft: '1.72rem',
    },
    '& ul li p': {
      margin: '0',
    },
    '& ul li ul': {
      marginTop: '0',
    },
    '& ol': {
      marginLeft: '1.72rem',
    },
  },
});

type IPostContextPorps = WithSheet<typeof styles>

const PostContent = (props: IPostContextPorps) => {
  const { classes } = props;
  const post = React.useContext(PostContext) as IPostContext;
  const { link, excerpt, html, simple } = post;

  return (
    <div>
      {simple ? (
        <div>
          <p className={classes.excerpt}>{excerpt}</p>
          <div className={classes.readMore}>
            <Link className={classes.link} to={link}>
              阅读更多...
            </Link>
          </div>
        </div>
      ) : (
        <div
          className={classes.markdown}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(PostContent);
