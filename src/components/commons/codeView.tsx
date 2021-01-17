/* eslint-disable react/no-danger */
import React from 'react';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-json';

interface Props {
  code: { __html: string } | undefined;
  language: string;
}

const CodeView = (props: Props) => {
  const { code, language } = props;
  return (
    <pre
      style={{ border: '1px solid' }}
      className={`language-${language} pre-response`}
      dangerouslySetInnerHTML={code}
    />
  );
};

export default CodeView;
