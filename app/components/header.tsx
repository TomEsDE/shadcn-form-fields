import TooltipWrapper from '@/components/@index';
import { ThemeSwitchV2 } from '@/components/theme-switch';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Header() {
  return (
    <div className="bg-cardd py-6">
      <div className="max-w-6xl mx-auto flex justify-between px-8">
        <div className="text-xl font-bold text-primary">shadcn form fields</div>
        <div className="flex items-center gap-4 md:gap-12 text-sm font-bold underline">
          <div className="hidden sm:flex items-center gap-8 text-sm font-bold underline">
            <Link href="#playground" className=" hover:text-primary">
              Playground
            </Link>
            <Link
              href="https://github.com/TomEsDe"
              target="_blank"
              className="hover:text-primary"
            >
              Github
            </Link>
          </div>
          <Link
            href="https://github.com/TomEsDe"
            target="_blank"
            className="hover:text-primary sm:hidden"
          >
            <TooltipWrapper tooltip="Github Repo">
              <FaGithub className="h-5 w-5 text-primary -mb-1" />
            </TooltipWrapper>
          </Link>
          <div className="scale-75 -mr-3">
            <ThemeSwitchV2 />
          </div>
        </div>
      </div>
    </div>
  );
}
