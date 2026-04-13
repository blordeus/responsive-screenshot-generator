import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1110px] px-6 md:px-10 lg:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}