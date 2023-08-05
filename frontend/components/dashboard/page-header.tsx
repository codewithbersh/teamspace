import { Separator } from "@/components/ui/separator";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageHeader = ({ title, description, children }: Props) => {
  return (
    <div className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-bold sm:text-3xl !leading-none">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {description}
          </p>
        </div>
        <div>{children}</div>
      </div>
      <Separator />
    </div>
  );
};

export { PageHeader };
