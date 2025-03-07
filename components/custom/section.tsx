export const Section = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <section
      id={id}
      className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted min-h-screen"
    >
      {children}
    </section>
  );
};
