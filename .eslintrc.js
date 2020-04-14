// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesnt affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

const ignore = 0;
const warning = 1;
const error = 2;

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'jest': true,
  },
  'extends': 'airbnb',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'babel',
    'react',
    'import',
    'jsx-a11y',
    'react-hooks',
  ],
  'rules': {
    'jsx-a11y/anchor-is-valid': [error, {
      'components': ['Link'],
      'specialLink': ['hrefLeft', 'hrefRight'],
      'aspects': ['invalidHref', 'preferButton'],
    }],
    'brace-style': [error, '1tbs', { 'allowSingleLine': false }],
    'max-len': [warning, { 'code': 120 }],
    'no-unused-vars': [warning],
    'multiline-ternary': [warning, 'always-multiline'],
    'operator-linebreak': [error, 'before'],
    'curly': [error, 'multi-line'],
    'indent': [error, 2, {
      SwitchCase: 1,
      MemberExpression: 1,
      ignoredNodes: ['JSXElement'],
    }],
    'no-confusing-arrow': [ignore],
    'no-underscore-dangle': [error, {
      'allow': [
        '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
        '__CONFIG__',
        '_embedded',
        '_links',
      ],
    }],
    // 'jsx-quotes': [error, 'prefer-single'],
    'import/prefer-default-export': [ignore],
    'import/no-unresolved': [ignore],
    'import/no-extraneous-dependencies': [warning, {
      devDependencies: [
        'webpack.*.js',
      ],
      optionalDependencies: false,
    }],
    'jsx-a11y/tabindex-no-positive': [ignore],
    'jsx-a11y/click-events-have-key-events': [ignore],
    'react/no-unescaped-entities': [ignore],
    'arrow-parens': [error, 'as-needed'],
    'no-unused-expressions': [error, { 'allowShortCircuit': true }],
    'implicit-arrow-linebreak': [ignore],
    'react/sort-comp': [ignore, {
      order: [
        'static-methods',
        'instance-variables',
        'instance-methods',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }],
    'react/sort-prop-types': [warning, {
      ignoreCase: true,
      requiredFirst: true,
      sortShapeProp: true,
      callbacksLast: true,
      noSortAlphabetically: false,
    }],
    'react/jsx-sort-default-props': [ignore, { ignoreCase: true }],
    'react/prop-types': [warning, { ignore: ['children', 'location', 'history', 'router'] }],
    'react/jsx-indent': [error, 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/jsx-indent-props': [error, 2],
    'react/jsx-props-no-spreading': [ignore],
    'react/static-property-placement': [error, 'static public field'],
    'react/state-in-constructor': [ignore],
    'react/jsx-filename-extension': [warning, { 'extensions': ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': [ignore],
    'jsx-a11y/label-has-for': [ignore],
    // 'react/jsx-curly-brace-presence': [error, { props: 'always', children: 'ignore' }],
    'react/jsx-one-expression-per-line': [error, { allow: 'single-child' }],
    'react/jsx-closing-bracket-location': [warning, { selfClosing: 'line-aligned', nonEmpty: 'after-props' }],
    'import/extensions': [ignore],
    'object-curly-newline': [error, {
      'ObjectPattern': { 'consistent': true },
      'ObjectExpression': { 'consistent': true },
      'ImportDeclaration': { 'consistent': true },
      'ExportDeclaration': { 'multiline': true, 'minProperties': 3 },
    }],
    'no-plusplus': [error, { 'allowForLoopAfterthoughts': true }],
    'react-hooks/rules-of-hooks': [error], // Checks rules of Hooks
    'react-hooks/exhaustive-deps': [warning], // Checks effect dependencies
  },
};
