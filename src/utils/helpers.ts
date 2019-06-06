import _ from 'lodash/fp';
import format from 'date-fns/format';
import getTime from 'date-fns/get_time';

// getBrowserWindow :: void -> window
export const getBrowserWindow = () => {
  return typeof window !== 'undefined' && window;
};

// getPostLink :: IMarkdownRemarkNode -> string
export const getPostLink = (post: IMarkdownRemarkNode) => {
  const {
    fields: { slug },
  } = post;
  return slug;
};

// formatPostDate :: string -> string
export const formatPostDate = (date: string) => {
  return format(date, 'YYYY年MM月DD日');
};

// formatReadingTime :: number -> string
export const formatReadingTime = (time: number) => {
  const minutes = Math.round(time * 2);
  return `预计阅读需要 ${minutes} 分钟`;
};

// getDocumentScrollTop :: () -> number
export const getDocumentScrollTop = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

// isInViewportByElementId :: string -> boolean
export const isInViewportByElementId = (id: any) => {
  const $el = document.getElementById(id);
  if ($el === null) {
    return false;
  }
  const rect = $el.getBoundingClientRect();
  const clientHeight = document.documentElement.clientHeight;
  return rect.top < clientHeight;
};

export const replaceUrlWithoutRefresh = (url: any) => {
  history.replaceState('', document.title, url);
};

// getMarkdownRemarkEdgeNode :: ImarkdownRemark -> IMarkdownRemarkNode[]
export const getMarkdownRemarkEdgeNode = _.compose(
  _.map('node'),
  _.get('allMarkdownRemark.edges'),
);

// groupByDateFromPost :: IMarkdownRemarkNode[] -> Dictionary<ImarkdownRemarkNode[]>
export const groupByDateFromNodes = _.compose(
  _.sortBy([([date]) => -getTime(date)]),
  _.entries,
  _.groupBy(
    _.compose(
      (date: any) => format(date, 'YYYY/MM'),
      _.get('frontmatter.date'),
    ),
  ),
);

// collectTagNamesFromNodes :: IMarkdownRemarkNode[] -> string[]
export const collectTagNamesFromNodes = _.compose(
  _.uniq,
  _.reduce(_.concat, []),
  _.map('frontmatter.tags'),
);

// generate table of post
export const getPostDoc = (doc: any) => {
  let resultDoc: any = [];
  let firstIndex = -1;
  let secondIndex = -1;
  for (let i = 0; i < doc.length; i++) {
    const item = doc[i];
    if (item.depth === 1) {
      resultDoc.push({
        value: item.value,
        anchor: formatAnchorID(item.value),
        children: [],
      });
      firstIndex = resultDoc.length - 1;
      secondIndex = 0;
    } else if (item.depth === 2) {
      if (firstIndex === -1) {
        firstIndex = 0;
        resultDoc[firstIndex] = {
          value: '',
          anchor: '',
          children: [],
        };
      }
      let currentItem = resultDoc[firstIndex].children;
      currentItem.push({
        value: item.value,
        anchor: formatAnchorID(item.value),
        children: [],
      });
      secondIndex = currentItem.length - 1;
    } else if (item.depth === 3) {
      if (firstIndex === -1) {
        firstIndex = 0;
        resultDoc[firstIndex] = {
          value: '',
          anchor: '',
          children: [],
        };
      }
      if (secondIndex === -1) {
        secondIndex = 0;
        resultDoc[firstIndex].children[secondIndex] = {
          value: '',
          anchor: '',
          children: [],
        };
      }
      let currentItem = resultDoc[firstIndex].children[secondIndex];
      if (!currentItem) {
        currentItem = {
          value: '',
          anchor: '',
          children: [],
        }
      }
      currentItem.children.push({
        value: item.value,
        anchor: formatAnchorID(item.value),
        children: [],
      })
    }
  }
  return resultDoc;
}

// format anchor value
export const formatAnchorID = (val: string) => {
  return val.replace(/ /g, '-')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/\./g, '')
    .replace(/\//g, '')
    .replace(/\+/g, '');
}
