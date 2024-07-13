import Link from "next/link";

type TitleCardProps = {
  link: string;
  title: string;
  desc: string;
};

export default function TitleCard({ link, title, desc }: TitleCardProps) {
  return (
    <Link
      href={link}
      className="flex h-full flex-col overflow-hidden rounded-xl bg-[#FFF8F3] shadow-md transition duration-300 hover:shadow-lg"
    >
      <div className="flex grow flex-col p-8">
        <h3 className="block text-2xl font-semibold leading-tight text-indigo-700 hover:underline">
          {title}
        </h3>
        <p className="mt-4 text-gray-600">{desc}</p>
      </div>
    </Link>
  );
}
