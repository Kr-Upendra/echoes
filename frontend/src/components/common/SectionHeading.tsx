type Props = { title: string; description: string };

export default function SectionHeading({ title, description }: Props) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold text-primary-real">{title}</h2>
      <p className="text-secondary-light font-medium">{description}</p>
    </div>
  );
}
