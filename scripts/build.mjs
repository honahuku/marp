import { cp, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const format = process.argv[2];
const formats = format === 'both' ? ['html', 'pdf'] : [format];
if (formats.some((outputFormat) => !['html', 'pdf'].includes(outputFormat))) {
  throw new Error('Expected html, pdf, or both');
}
await mkdir('dist', { recursive: true });
for (const outputFormat of formats) {
  const args = [
    'node_modules/@marp-team/marp-cli/marp-cli.js',
    '--input-dir',
    'slides',
    '--output',
    'dist',
  ];
  if (outputFormat === 'pdf') args.push('--pdf', '--allow-local-files');
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
await cp('slides/assets', 'dist/assets', { recursive: true });
