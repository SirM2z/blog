import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';

import useValine from '../../hooks/useValine';
import useWindowScroll from '../../hooks/useWindowScroll';
import { isInViewportByElementId, replaceUrlWithoutRefresh } from '../../utils/helpers';

const styles = (theme: any) => ({
  comment: {
    marginBottom: '50px',
    '& .gt-container': {
      '& a': {
        color: theme.themeColor,
        boxShadow: 'none',
      },
      '& svg': {
        fill: theme.themeColor,
      },
      '& .gt-ico-github svg': {
        fill: theme.blackColor,
      },
      '& .gt-btn': {
        backgroundColor: theme.themeColor,
        borderColor: theme.themeColor,
      },
      '& .gt-btn-preview': {
        color: theme.themeColor,
        borderColor: theme.themeColor,
        backgroundColor: '#fff',
      },
      '& .gt-comment-content': {
        backgroundColor: '#fff',
      }
    },
  },
});

type ICommentProps = WithSheet<typeof styles> & {
  path: string;
  title: string;
}

const Commemt = (props: ICommentProps) => {
  const { classes, path, title } = props;
  useValine('#comment', path);

  // add `#comment` to url when scroll comment element into viewport
  useWindowScroll(() => {
    if (isInViewportByElementId('comment')) {
      replaceUrlWithoutRefresh(`${location.pathname}#comment`);
    } else if (location.hash) {
      replaceUrlWithoutRefresh(location.pathname);
    }
  }, /* resize = */ true);

  return (
    <div className={classes.comment} >
      <span id={path} className="leancloud_visitors" data-flag-title={title}>
        <span className="post-meta-item-text">文章阅读量 </span>
        <span className="leancloud-visitors-count">loading...</span>
        <p></p>
      </span>
      <div id="comment"></div>
    </div>
  );
};

export default withStyles(styles)(Commemt);
