import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}
const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar tenantSlug={slug} />
      <div className="flex-1">
        <div className="max-w-(--breackpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
