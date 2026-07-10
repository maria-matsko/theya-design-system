import StyleDictionary from 'style-dictionary';

const commonSource = [
  'src/primitive/color.json',
  'src/primitive/size.json',
  'src/primitive/typography.json',
  'src/semantic/size.json',
  'src/semantic/typography.json',
];

export default {
  source: [...commonSource, 'src/semantic/color.default.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6',
        },
        {
          destination: 'tokens.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
    'tailwind-json': {
      transformGroup: 'js',
      buildPath: 'build/tailwind/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
  },
};

// Dark theme is built separately — see build-dark.mjs — because Style
// Dictionary resolves one value per token per run. We swap
// src/semantic/color.default.json for src/semantic/color.dark.json
// and re-run against a different output file (variables-dark.css).
