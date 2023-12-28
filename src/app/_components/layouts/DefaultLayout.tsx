import Header from "../nav/Header";
import Sidebar from "../sidebar/Sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#0d0d0d] text-white">
      <Header />

      <div className="flex h-[calc(100%-64px)] flex-grow">
        <Sidebar />

        <main className="h-full flex-grow overflow-auto overflow-y-auto p-5">
          {children}
        </main>
      </div>
    </div>
  );
}
