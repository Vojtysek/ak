export const Section = ({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={`w-full bg-muted min-h-[90vh] lg:justify-center flex flex-col first:pt-8 pt-24 items-center  ${className}`}
    >
      {children}
    </section>
  );
};
