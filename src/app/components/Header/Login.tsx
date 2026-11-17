"use client";

import { authClient } from "@/app/lib/auth-client";
import { Menu } from "@/app/lib/Interface/Menu";
import { Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

const isLogoutUser: Menu[] = [
  { label: "Sign In", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

const isLoggedUser: Menu[] = [
  { label: "Create Event", href: "/programmes/post" },
  { label: "My Event", href: "/programmes/mine" },
];

const LoginComponent = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user.name;
  const menuItems = session ? isLoggedUser : isLogoutUser;

  const handlerLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/signin");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <Button variant="secondary" isDisabled className="h-10 rounded-xl px-4">
        Loading...
      </Button>
    );
  }

  return (
    <Dropdown>
      <Button className="h-10 rounded-xl bg-secondary px-4 font-semibold text-white transition-colors hover:bg-primary sm:px-5">
        {session ? (
          <span className="max-w-24 truncate sm:max-w-32">{user}</span>
        ) : (
          "Login"
        )}
      </Button>

      <Dropdown.Popover className="min-w-48 rounded-xl border border-default-200 bg-background p-1.5 shadow-xl">
        <Dropdown.Menu className="gap-1">
          {menuItems.map((item) => (
            <Dropdown.Item
              key={item.href}
              id={item.href}
              textValue={item.label}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-content-primary transition-colors hover:bg-default-100"
            >
              <Link href={item.href} className="block w-full font-medium">
                {item.label}
              </Link>
            </Dropdown.Item>
          ))}

          {session && (
            <Dropdown.Item
              id="logout"
              textValue="Logout"
              onClick={handlerLogout}
              className="cursor-pointer rounded-lg bg-danger px-3 py-2.5 text-sm text-white transition-colors hover:bg-danger/80"
            >
              <div className="flex items-center gap-2 font-medium">
                <FaSignOutAlt />
                Logout
              </div>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};

export default LoginComponent;
