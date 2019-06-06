import * as React from 'react';
import withStyles, { WithSheet } from 'react-jss';
import { getPostDoc, formatAnchorID, getDocumentScrollTop } from '../../utils/helpers';
import useWindowScroll from '../../hooks/useWindowScroll';

const docFixTop = 100;
const styles = (theme: any) => ({
  doc: {
    position: 'fixed',
    top: docFixTop + 'px',
    width: '190px',
    maxHeight: '400px',
    overflowY: 'auto',
    marginLeft: '870px',
    padding: '10px',
    borderRadius: '5px',
    background: 'rgba(245,242,240,.6)',
    boxShadow: '1px 1px 2px rgba(0,0,0,.125)',
    wordWrap: 'break-word',
    boxSizing: 'border-box',
    '& h2': {
      margin: '0 10px',
      fontSize: '20px',
      fontWeight: '400',
      textTransform: 'uppercase',
    },
  },
  '@media (max-width: 1279px)': {
    doc: {
      display: 'none',
    },
  },
  simple: {
    margin: '20px 0 10px',
  },
  content: {
    fontSize: '14px',
    '& ul': {
      margin: '10px 0',
      paddingLeft: '14px',
    },
    '& li': {
      lineHeight: '1.5',
    },
    '& li ul': {
      margin: '0',
    },
    '& a': {
      color: '#34495e',
      textDecoration: 'none',
      boxShadow: 'none',
    },
    '& .active': {
      boxShadow: '0 1px 0 0 #FA7268',
      color: '#FA7268',
    },
  },
});

type IPostDocProps = WithSheet<typeof styles> & {
  post: IMarkdownRemarkNode;
}

interface docContent {
  value: string;
  anchor: string;
  children?: docContent[];
}

let footerHeight: number = 0;

const PostDoc = (props: IPostDocProps) => {
  const { classes, post } = props;
  const { headings } = post;
  const footerElementID: string = 'PostFooter-footer';
  const docRef = React.createRef<HTMLDivElement>();
  const [footerIn, setFooterIn] = React.useState(false);
  const [docTop, setDocTop] = React.useState(0);
  const [activeAnchor, setActiveAnchor] = React.useState('');

  let resultDoc: docContent[] = getPostDoc(headings);

  const searchAnchor = (ary: docContent[]) => {
    for (let i = 0; i < ary.length; i++) {
      const firstAnchor = ary[i].anchor;
      if (firstAnchor)  {
        const clientTop = document.getElementById(firstAnchor).getBoundingClientRect().top;
        if (clientTop > 0 && clientTop < 200) {
          setActiveAnchor(firstAnchor)
          return true;
        }
      }
      if (ary[i].children.length > 0 && searchAnchor(ary[i].children)) {
        return true;
      }
    }
    return false
  }

  useWindowScroll(() => {
    if (!footerHeight && docRef.current) {
      footerHeight = document.getElementById(footerElementID).offsetTop;
      setDocTop(footerHeight - docRef.current.offsetHeight);
    }
    if (docRef.current) {
      if (document.getElementById(footerElementID).getBoundingClientRect().top < docRef.current.offsetHeight + docFixTop) {
        footerIn === false && setFooterIn(true);
      } else {
        footerIn === true && setFooterIn(false);
      }
    }
    searchAnchor(resultDoc);
  });

  const docTree = (ary: docContent[]) => {
    if (ary[0] && ary[0].value === '') {
      ary = ary[0].children;
    }
    return (
      <ul>
        {
          ary.map((item, index) => {
            return (
              <li key={item.value + index}>
                {item.value
                  ? <a href={'#' + item.anchor}
                    className={activeAnchor === item.anchor ? 'active' : null}>{item.value}</a>
                  : null}
                {item.children.length > 0 ? docTree(item.children) : null}
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <div className={classes.doc} ref={docRef}
      style={footerIn ? {position: 'absolute', top: docTop + 'px'} : null}>
      <h2>文章目录</h2>
      <div className={classes.content}>
        <nav>
          { headings ? docTree(resultDoc) : null }
        </nav>
      </div>
    </div>
  );
};

export default withStyles(styles)(PostDoc);
