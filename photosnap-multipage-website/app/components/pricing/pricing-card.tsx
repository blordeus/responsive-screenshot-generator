type PricingCardProps = {
  name: string;
  description: string;
  price: number;
  isFeatured?: boolean;
};

export default function PricingCard({
  name,
  description,
  price,
  isFeatured = false,
}: PricingCardProps) {
  return (
    <article
      className={[
        "relative flex flex-col px-[43px] py-14 text-center md:grid md:grid-cols-[1fr_auto] md:items-center md:gap-x-10 md:text-left lg:flex lg:text-center",
        isFeatured
          ? "bg-black text-white lg:-my-10 lg:py-[88px]"
          : "bg-[#f5f5f5] text-black",
      ].join(" ")}
    >
      {isFeatured ? (
        <div className="absolute left-0 top-0 h-[6px] w-full bg-[image:var(--gradient-6)] lg:h-full lg:w-[6px]" />
      ) : null}

      <div>
        <h3 className="text-[24px] font-bold leading-[25px]">{name}</h3>
        <p
          className={[
            "mt-[18px] text-[15px] leading-[25px]",
            isFeatured ? "text-white/60" : "text-black/60",
          ].join(" ")}
        >
          {description}
        </p>
      </div>

      <div className="mt-10 md:mt-0 lg:mt-10">
        <p className="text-[40px] font-bold leading-[48px] tracking-[4.17px]">
          ${price}.00
        </p>
        <p
          className={[
            "mt-1 text-[15px] leading-[25px]",
            isFeatured ? "text-white/60" : "text-black/60",
          ].join(" ")}
        >
          per month
        </p>
      </div>

      <button
        type="button"
        className={[
          "mt-10 w-full px-6 py-3 text-[12px] font-bold uppercase tracking-[2px] transition md:col-span-2 lg:mt-10",
          isFeatured
            ? "bg-white text-black hover:bg-[#dfdfdf]"
            : "bg-black text-white hover:bg-[#dfdfdf] hover:text-black",
        ].join(" ")}
      >
        Pick Plan
      </button>
    </article>
  );
}
