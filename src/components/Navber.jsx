"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  // console.log(user, "user");

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      {/* Logo */}

      <ul className="flex items-center gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/destinations">Destinations</Link>
        </li>
        <li>
          <Link href="/bookings">My Bookings</Link>
        </li>
        {/* <li>
          <Link href="/a">Admin</Link>
        </li> */}
        <li>
          <Link href="/add-destination">Add Destination</Link>
        </li>
      </ul>

      <Link href="/">
        <Image
          src="/assets/Wanderlast.png"
          width={150}
          height={50}
          alt="Wanderlust Logo"
          priority
        />
      </Link>

      {/* Menu */}

      {/* Right Side */}
      <ul className="flex items-center gap-6">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <FaRegUser />
            <span>Profile</span>
          </Link>
        </li>

        {user ? (
          <>
        <Avatar>
        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user?.name?.split(" ").map((n) => n[0]).join("")}</Avatar.Fallback>
        </Avatar>

            <li className="border p-2 bg-red-400 px-2 text-white">
              <button  onClick={() => authClient.signOut()}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/signIn">Login</Link>
            </li>

            <li>
              <Link href="/signUp">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
