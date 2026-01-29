import { baseMeta } from '~/utils/meta';


export function meta() {
  return baseMeta({
    title: 'Skills',
    description:
      'A collection of technical design and development skills.',
  });
}

export { Skills as default } from './skills';
