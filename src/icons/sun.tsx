import Icon from '@ant-design/icons';
import React from 'react';

const SunSVG = (prop) => (
  <svg
    t="1609713592237"
    className="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    p-id="1638"
    width={prop.width}
    height={prop.height}
  >
    <defs>
      <style type="text/css" />
    </defs>
    <path
      d="M960 512l-128 128v192h-192l-128 128-128-128H192v-192l-128-128 128-128V192h192l128-128 128 128h192v192z"
      fill="#FFD878"
      p-id="1639"
    />
    <path
      d="M736 512a224 224 0 1 0-448 0 224 224 0 1 0 448 0z"
      fill="#FFE4A9"
      p-id="1640"
    />
    <path
      d="M512 109.248L626.752 224H800v173.248L914.752 512 800 626.752V800h-173.248L512 914.752 397.248 800H224v-173.248L109.248 512 224 397.248V224h173.248L512 109.248M512 64l-128 128H192v192l-128 128 128 128v192h192l128 128 128-128h192v-192l128-128-128-128V192h-192l-128-128z"
      fill="#4D5152"
      p-id="1641"
    />
    <path
      d="M512 320c105.888 0 192 86.112 192 192s-86.112 192-192 192-192-86.112-192-192 86.112-192 192-192m0-32a224 224 0 1 0 0 448 224 224 0 0 0 0-448z"
      fill="#4D5152"
      p-id="1642"
    />
  </svg>
);

// eslint-disable-next-line react/jsx-props-no-spreading
const SunIcon = (props: any) => <Icon component={SunSVG} {...props} />;

export default SunIcon;
