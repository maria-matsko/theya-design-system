import StyleDictionary from 'style-dictionary';

export default {
  source: [
    'src/primitive/color.json',
    'src/primitive/size.json',
    'src/primitive/typography.json',
    'src/semantic/size.json',
    'src/semantic/typography.json',
    'src/semantic/color.dark.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          options: { selector: '[data-theme="dark"]' },
        },
      ],
    },
  },
};
