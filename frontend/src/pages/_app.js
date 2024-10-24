import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Common/navbar";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
