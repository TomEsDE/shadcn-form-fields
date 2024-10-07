import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="bg-cardd py-6">
      <div className="max-w-6xl mx-auto flex justify-between px-8">
        <div className="font-semibold text-primary">© 2024</div>
        <div className="text-primary/50 flex items-center gap-2">
          <Image
            src="/svg_backgrounds_icon.svg"
            height={0}
            width={0}
            className="h-5 w-5"
            alt="svg-bgs.com"
          />
          <a
            className="hidden md:block"
            target="_blank"
            href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"
          >
            Free SVG Backgrounds by SVGBackgrounds.com
          </a>
          <a
            className="block md:hidden"
            target="_blank"
            href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"
          >
            SVGBackgrounds.com
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-12 text-sm font-bold underline">
          <Link
            href="https://www.linkedin.com/in/tms-schmidt/"
            target="_blank"
            className="hover:text-primary"
          >
            <FaLinkedin className="h-5 w-5 text-primary" />
          </Link>
          <Link
            href="https://github.com/TomEsDE/shadcn-form-fields"
            target="_blank"
            className="hover:text-primary"
          >
            <FaGithub className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
