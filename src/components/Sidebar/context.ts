import * as React from 'react';

export interface ISidebarContext {
  posts: IMarkdownRemarkNode[];
}

const SidebarContext = React.createContext({});

export default SidebarContext;
