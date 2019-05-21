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

declare interface IMarkdownRemarkNode {
  id: number;
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    // issueId: number;
  };
  fields: {
    slug: string;
    keywords: string[];
  };
  excerpt: string;
  html: string;
  rawMarkdownBody: string;
  timeToRead: number;
}
