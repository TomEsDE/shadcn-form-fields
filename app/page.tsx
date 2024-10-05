import Hero from './components/hero';
import Playground from './components/playground';
import Syntax from './components/syntax';
import Typesafe from './components/typesafe';

export default function FormFields() {
  return (
    <div className="flex flex-col [&>*]:px-4 md:[&>*]:px-8 [&>*]:py-[clamp(3rem,16cqw,6rem)]">
      <Hero />
      <div className="bg-card/50 dark:bg-secondary/30">
        <Typesafe />
      </div>
      <Syntax />
      <div className="bg-card/50 dark:bg-secondary/30">
        <Playground />
      </div>
    </div>
  );
}
