import { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
// @ts-ignore
import Valine from 'valine';
import leancloudStorage from 'leancloud-storage';
import _ from 'lodash/fp';

// Valine 依赖 leancloudStorage ，将其挂载全局，兼容 ssr 时 window 不存在
const globalWindow: any = window ? window : global;
globalWindow.AV = leancloudStorage;

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
    new Valine({
      el: elemantId ,
      appId: options.appId,
      appKey: options.appKey,
      path: path,
      notify: options.notify, 
      verify: options.verify, 
      avatar:options.avatar, 
      placeholder: options.placeholder,
      visitor: options.visitor,
    });
  }, []);
};

export default useValine;
