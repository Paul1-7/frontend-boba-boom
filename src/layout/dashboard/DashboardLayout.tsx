import { ReactNode, Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "..";
import { MENU_ITEMS_DASHBOARD } from "@/constants";
import { useBreakpoints } from "@/hooks";
import { Progress } from "@nextui-org/react";

interface Props {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentBreakpoint, breakpoints } = useBreakpoints();
  const { XS, SS, none } = breakpoints;

  const handleOpen = () => {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  };

  const isSSBreakpoint =
    currentBreakpoint === SS.name ||
    currentBreakpoint === XS.name ||
    currentBreakpoint === none.name;

  return (
    <>
      <Navbar
        menuItems={MENU_ITEMS_DASHBOARD}
        handleOpen={handleOpen}
        isMenuOpen={isMenuOpen}
        matchedBreakpoint={isSSBreakpoint}
      />

      <section className="fixed left-0 right-0 top-0 mt-16 flex">
        <Sidebar
          menuItems={MENU_ITEMS_DASHBOARD}
          isMenuOpen={isMenuOpen}
          matchedBreakpoint={isSSBreakpoint}
        />

        <main className="scroll flex-grow overflow-y-auto">
          <Suspense
            fallback={
              <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md"
              />
            }
          >
            {children}
            <Outlet />
          </Suspense>
        </main>
      </section>
    </>
  );
};

export default DashboardLayout;
