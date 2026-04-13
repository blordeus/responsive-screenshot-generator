import Image from "next/image";
import { compareFeatures } from "@/data/pricing";

export default function CompareTable() {
  return (
    <section className="bg-[#f5f5f5] px-7 pb-16 pt-4 md:px-10 md:pb-[112px] lg:px-[355px]">
      <div className="mx-auto max-w-[731px]">
        <h2 className="hidden text-center text-[40px] font-bold uppercase leading-[48px] tracking-[4.17px] md:block">
          Compare
        </h2>

        <div className="mt-16 hidden md:block">
          <div className="grid grid-cols-[1.8fr_repeat(3,1fr)] border-b border-black pb-6 text-[12px] font-bold uppercase tracking-[2px]">
            <span>The Features</span>
            <span className="text-center">Basic</span>
            <span className="text-center">Pro</span>
            <span className="text-center">Business</span>
          </div>

          {compareFeatures.map((feature) => (
            <div
              key={feature.label}
              className="grid grid-cols-[1.8fr_repeat(3,1fr)] items-center border-b border-black/25 py-6"
            >
              <span className="text-[12px] font-bold uppercase tracking-[2px]">
                {feature.label}
              </span>

              <span className="flex justify-center">
                {feature.basic ? (
                  <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                ) : null}
              </span>

              <span className="flex justify-center">
                {feature.pro ? (
                  <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                ) : null}
              </span>

              <span className="flex justify-center">
                {feature.business ? (
                  <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                ) : null}
              </span>
            </div>
          ))}
        </div>

        <div className="md:hidden">
          <h2 className="text-[12px] font-bold uppercase tracking-[2px]">
            The Features
          </h2>

          <div className="mt-6">
            {compareFeatures.map((feature) => (
              <div key={feature.label} className="border-b border-black/25 py-6">
                <h3 className="text-[12px] font-bold uppercase tracking-[2px]">
                  {feature.label}
                </h3>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[1.67px] text-black/50">
                      Basic
                    </p>
                    <div className="mt-2 h-4">
                      {feature.basic ? (
                        <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[1.67px] text-black/50">
                      Pro
                    </p>
                    <div className="mt-2 h-4">
                      {feature.pro ? (
                        <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[1.67px] text-black/50">
                      Business
                    </p>
                    <div className="mt-2 h-4">
                      {feature.business ? (
                        <Image src="/assets/shared/check.svg" alt="" width={16} height={12} />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}