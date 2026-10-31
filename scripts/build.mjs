import { cp, mkdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const format = process.argv[2];
if (!['html', 'pdf'].includes(format)) throw new Error('Expected html or pdf');
await mkdir('dist', { recursive: true });
const args = ['node_modules/@marp-team/marp-cli/marp-cli.js', '--input-dir', 'slides', '--output', 'dist'];
if (format === 'pdf') args.push('--pdf', '--allow-local-files');
const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
await cp('slides/assets', 'dist/assets', { recursive: true });
