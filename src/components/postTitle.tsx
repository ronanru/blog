import type { Component, JSXElement } from 'solid-js';
import { Balancer } from 'solid-wrap-balancer';

const PostTitle: Component<{ children: JSXElement }> = ({ children }) => {
  return <Balancer>{children}</Balancer>;
};

export default PostTitle;
