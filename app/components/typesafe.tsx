import { TypescriptIcon } from '@/components/svg';
import Image from 'next/image';

export default function Typesafe() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-4">
      {/* <div className="[text-wrap:balance] text-[clamp(2rem,12cqw,2.5rem)]/[1.125] text-primary font-bold text-center">
        Features
      </div> */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        <div className="md:w-3/5 flex justify-center order-2 md:order-1 lg:px-12 xl:px-24">
          <Image
            src="https://tomesde-pub.s3.eu-central-1.amazonaws.com/nextjs-form-fields/typesafe.png"
            alt="typesafe"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-full max-h-full min-h-52 object-contain"
          />
        </div>
        <div className="md:w-2/5 flex flex-col gap-3 md:gap-8 text-center md:text-left justify-center items-center mmd:text-right order-1 md:order-2">
          <div className="flex flex-col gap-1">
            <TypescriptIcon className="text-primary h-12 w-12 self-center md:self-start" />
            <div className="font-semibold text-base hidden md:block">
              Integration made easy
            </div>
            <div className="[text-wrap:balance] text-[clamp(1.5rem,15cqw,2rem)]/[1.125] font-bold text-primary">
              Typesafe and compatible with zod
            </div>
          </div>
          <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl">
            Full typesafe with any custom zod-schema and its corresponding type
          </div>
          <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl">
            Displays the error messages of your zod-configuration
          </div>
        </div>
      </div>
    </div>
  );
}
