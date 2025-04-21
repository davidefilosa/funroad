import { cookies as getCookies } from "next/headers";

interface GenerateAuthCookiesProps {
  prefix: string;
  value: string;
}

export const generateAuthCookies = async ({
  prefix,
  value,
}: GenerateAuthCookiesProps) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/",
    // sameSite: "none",
    // domain: "",
  });
};
