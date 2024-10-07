import { ClockArrowDown } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import HeroExamples from './hero-examples';
SyntaxHighlighter.registerLanguage('tsx', tsx);

export default function Syntax() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-12">
      <div className="md:w-1/2 h-auto flex flex-col gap-8 text-center items-center md:items-start md:text-left">
        <div className="flex flex-col gap-1">
          <ClockArrowDown className="text-primary h-12 w-12 self-center md:self-start" />
          <div className="font-semibold text-base hidden md:block">
            Efficient coding
          </div>
          <div className="[text-wrap:balance] text-[clamp(1.5rem,15cqw,2rem)]/[1.125] font-bold text-primary">
            Less boilerplate code means faster development
          </div>
        </div>
        <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl">
          Easier to create, easier to maintain: build forms efficient with
          clear, less redundant code and save time
        </div>
        <div className="font-extralight text-muted-foreground [text-wrap:balance] text-xl">
          The form components include label options, icon options, description
          and error message, all adjustable to your needs
        </div>
        <div className="w-10/12 self-center hidden md:block">
          <HeroExamples showCombo={false} title="Result" />
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center items-center lg:items-end">
        <div className="border rounded-lg py-4 bg-[rgb(40,44,52)]/[1] 11/12 h-fit max-w-md">
          <SyntaxHighlighter
            showLineNumbers={true}
            useInlineStyles={true}
            language="tsx"
            style={oneDark}
            customStyle={{
              fontSize: '9pt',
              padding: '0 8px 0 8px',
              margin: '0px',
              maxWidth: '80cqw',
            }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="w-10/12 self-center md:hidden block">
        <HeroExamples showCombo={false} title="Result" />
      </div>
    </div>
  );
}

const codeString = `const Schema = z.object({
  username: z.string().min(3,
      'Name must be at least 3 characters long'),
  password: z.string().min(8,
      'Password needs at least 8 characters'),
});

function MyPage() {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          name="username"
          control={form.control}
          formState={form.formState}
          label="Username"
          placeholder="Enter your username"
        />
        <FormInputField
          type="password"
          name="password"
          control={form.control}
          formState={form.formState}
          label="Password"
        />`;
