import * as React from 'react';
import { Link } from 'gatsby';
import { FaHashtag } from 'react-icons/fa';
import withStyles, { WithSheet } from 'react-jss';

import PostContext, { IPostContext } from './context';
import { TAG_SYMBOL } from '../../consts';

const styles = (theme: any) => ({
  footer: {
    marginTop: '20px',
  },
  copyright: {
    paddingTop: '10px',
    borderTop: '1px dashed #e6e6e6',
    '& p': {
      margin: '5px 0',
    },
  },
  copyrightTitle: {
    display: 'inline-block',
    minWidth: '5rem',
    marginRight: '.5rem',
    textAlign: 'right',
  },
  tagList: {
    marginTop: '20px',
    marginBottom: '10px',
    borderTop: theme.defaultBorder,
    padding: '15px 0',
  },
  tag: {
    color: theme.themeColor,
    marginRight: '10px',
  },
  icon: {
    fontSize: '0.85em',
    marginRight: '2px',
  },
  link: {
    boxShadow: 'none',
  },
});

type IPostFooterPorps = WithSheet<typeof styles>;

const PostFooter = (props: IPostFooterPorps) => {
  const { classes } = props;
  const post = React.useContext(PostContext) as IPostContext;
  const { simple, frontmatter: { tags, lastmod, author } } = post;

  if (simple) {
    return null;
  }

  return (
    <div id="PostFooter-footer" className={classes.footer}>
      <div className={classes.copyright}>
        <p>
          <span className={classes.copyrightTitle}>文章作者：</span>
          <span>{author}</span>
        </p>
        <p>
          <span className={classes.copyrightTitle}>上次更新：</span>
          <span>{lastmod}</span>
        </p>
      </div>
      <div className={classes.tagList}>
        {tags.map((name) => (
          <span className={classes.tag} key={name}>
            <span className={classes.icon}>
              <FaHashtag />
            </span>
            <Link
              className={classes.link}
              to={`/search?keyword=${TAG_SYMBOL} ${name}`}
            >
              {name}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default withStyles(styles)(PostFooter);
