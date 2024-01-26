import React from 'react';
import BlogHeading from './blog-heading';
import BlogPara from './blog-para';
import BlogCode from './blog-code';


const ComponentRenderer = ({ type, size, text }: { type: string, size:'page'| 'sub'|'section', text: string }) => {
  
  let componentMap:any = {
    "HEADING": <BlogHeading size={size} text={text} />,
    "PARAGRAPH": <BlogPara text={text} />,
    "CODE": <BlogCode code={text} />
  }
  return componentMap[type];
}

export default ComponentRenderer