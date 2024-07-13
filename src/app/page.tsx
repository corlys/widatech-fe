import TitleCard from "~/components/Cards/TitleCard";
export default function HomePage() {
  const titles = [
    { link: "/", title: "Home", desc: "" },
    { link: "/form", title: "Form", desc: "" },
    { link: "/invoices", title: "Invoices", desc: "" },
    { link: "/graph", title: "Revenue Graph", desc: "" },
  ];

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-8 py-8 text-[#405D72]">
      <div className="justify-strech grid h-full grid-cols-2 gap-4 text-[#405D72]">
        {titles.map((item) => (
          <TitleCard
            link={item.link}
            title={item.title}
            desc={item.desc}
            key={item.link}
          />
        ))}
      </div>
    </div>
  );
}
