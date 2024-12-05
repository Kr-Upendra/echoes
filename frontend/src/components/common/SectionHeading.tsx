type Props = { title: string; description: string };

export default function SectionHeading({ title, description }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-4xl sm:text-2xl font-display text-white">{title}</h2>
      <p className="text-gray-400 mt-2 font-medium">{description}</p>
    </div>
  );
}
