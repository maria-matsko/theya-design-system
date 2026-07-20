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
      transforms: [
        'attribute/cti',
        'name/kebab',
        'time/seconds',
        'html/icon',
        'size/px',
        'color/css',
        'asset/url',
        'fontFamily/css',
        'cubicBezier/css',
      ],
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
