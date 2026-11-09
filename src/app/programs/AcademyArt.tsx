import Image from 'next/image';

export const numberFa = (value: number) => value.toLocaleString('fa-IR');

export function AcademyArt({ cover, large = false }: { cover: string; large?: boolean }) {
  return <div className={large ? 'ac-art ac-art-large' : 'ac-art'} aria-hidden="true">
    <div className="ac-art-contour" />
    <Image src={cover} alt="" fill preload={large} sizes={large ? '(max-width: 780px) 90vw, 40vw' : '(max-width: 600px) 90vw, (max-width: 1000px) 43vw, 400px'} />
  </div>;
}
