import Link from "next/link";
import Image from "next/image";

import { Cookie, CalendarClock, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    name: "Daily Limits",
    description:
      "Cookie Jars have daily limits and can be claimed by anyone on the allowlist",
    href: "#",
    icon: CalendarClock,
  },
  {
    name: "Take out the trash?",
    description:
      "Claim cookies for doing tasks like taking out the trash, paying for services, but don&apos;t forget to leave a note!",
    href: "#",
    icon: Trash2,
  },
  {
    name: "Managed by your DAO",
    description:
      "Be careful, if you take too many cookies without good reason, you might just get kicked out of the DAO!",
    href: "#",
    icon: Cookie,
  },
];

export default async function Home() {
  return (
    <section className="max-w-3x container my-8 flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="rounded-xl border-4 border-amber-950 bg-amber-100 p-8 text-5xl font-bold">
          Welcome to
        </h1>
        <Image
          src={"/cookie-jar.png"}
          alt="Cookie Jar"
          height={450}
          width={450}
          priority
        />
      </div>
      <div className="flex flex-col gap-8 rounded-xl bg-amber-100 bg-opacity-90 p-8 text-center">
        <div className="mb-2">
          <h2 className="text-3xl font-bold">What is Cookie Jar?</h2>
          <p className="mb">Cookie Jar is a DAO owned slush fund</p>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex flex-col items-center justify-center gap-3 text-xl font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-16 w-16 flex-none text-amber-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/jars">
            <Button>Jars</Button>
          </Link>
          <Link href="/mintERC20">
            <Button>Mint ERC20 gated Jar</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
