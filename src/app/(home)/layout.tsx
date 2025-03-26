// layout.tsx
import { Navbar } from '@/components/home/navbar';

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
      <Navbar />
      <div className="lg:px-56 md:px-24 px-8 py-16">
        {children}
      </div>
    </div>
  );
};