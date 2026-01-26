import { baseMeta } from '~/utils/meta';
import { json } from '@remix-run/cloudflare';

export function meta() {
  return baseMeta({
    title: 'Skills',
    description:
      'A collection of technical design and development skills.',
  });
}

export { Skills as default } from './skills';
