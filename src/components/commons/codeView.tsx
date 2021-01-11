import React from 'react';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';

function CodeView(props) {
  return (
    <pre
      style={{ border: '1px solid' }}
      className={`language-${props.language} pre-response`}
      dangerouslySetInnerHTML={props.code}
    />
  );
}

export default CodeView;
