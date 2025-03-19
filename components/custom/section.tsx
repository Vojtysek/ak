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
      className={`w-full pt-12 md:py-24 lg:py-32 xl:py-48 bg-muted min-h-[50vh] lg:max-h-screen ${className}`}
    >
      {children}
    </section>
  );
};
