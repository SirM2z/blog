declare const graphql: (query: TemplateStringsArray) => void;

declare interface ISiteMenuItem {
  name: string;
  path: string;
  header: boolean;
}

declare interface ISiteLink {
  name: string;
  link: string;
}

declare interface ISiteValine {
  appId: string,
  appKey: string,
  notify: string, 
  verify: string, 
  avatar:string, 
  placeholder: string,
  visitor: string,
}

declare interface ISiteMetadata {
  title: string;
  since: number;
  author: string;
  menu: ISiteMenuItem[];
  socials: ISiteLink[];
  friends: ISiteLink[];
  valine: ISiteValine;
}

declare interface IMarkdownRemark {
  edges: IMarkdownRemarkEdge[];
}

declare interface IMarkdownRemarkEdge {
  node: IMarkdownRemarkNode;
}

declare interface IMarkdownRemarkNodeHeadings {
  value: string;
  depth: number;
}

declare interface IMarkdownRemarkNode {
  id: number;
  frontmatter: {
    title: string;
    date: string;
    lastmod: string;
    author: string;
    tags: string[];
    // issueId: number;
  };
  headings: IMarkdownRemarkNodeHeadings[];
  fields: {
    slug: string;
    keywords: string[];
  };
  excerpt: string;
  html: string;
  rawMarkdownBody: string;
  timeToRead: number;
}
