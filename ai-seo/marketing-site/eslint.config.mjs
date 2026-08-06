import next from 'eslint-config-next/core-web-vitals';

// Next 16 removed `next lint`; lint runs through the ESLint CLI on this flat
// config. `eslint-config-next/core-web-vitals` ships a ready flat-config array.
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
  ...next,
];

export default config;
