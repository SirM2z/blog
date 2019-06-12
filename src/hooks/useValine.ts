import { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// @ts-ignore
import _ from 'lodash/fp';
// import Valine from 'valine';
// import leancloudStorage from 'leancloud-storage';
// 兼容 ssr 写法，以下两个库使用了 window
if (typeof window !== `undefined`) {
  var Valine = require('valine');
  const leancloudStorage = require('leancloud-storage');

  // Valine 依赖 leancloudStorage ，将其挂载全局
  const globalWindow: any = window;
  globalWindow.AV = leancloudStorage;
}

const useValine = (elemantId: string, path: string) => {
  const data = useStaticQuery(graphql`
    query GetSiteValine {
      site {
        siteMetadata {
          valine {
            enable
            appId
            appKey
            notify
            verify
            avatar
            placeholder
            visitor
          }
        }
      }
    }
  `);
  const options: ISiteValine = _.get('site.siteMetadata.valine', data);

  useEffect(() => {
    // console.log({valine: window.AV});
    const valine = new Valine({
      el: elemantId ,
      appId: options.appId,
      appKey: options.appKey,
      path,
      notify: options.notify,
      verify: options.verify,
      avatar: options.avatar,
      placeholder: options.placeholder,
      visitor: options.visitor,
    });
  }, []);
};

export default useValine;
