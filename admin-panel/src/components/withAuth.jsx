"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem("Token");
      if (!token) {
        router.push("/login");
      } else {
        setIsLoading(false); // token exists, allow render
      }
    }, [router]);

    if (isLoading) return null; // or a loading spinner

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;