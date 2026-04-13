export const pricingPlans = {
  monthly: [
    {
      name: "Basic",
      description:
        "Includes basic usage of our platform. Recommended for new and aspiring photographers.",
      price: 19,
      isFeatured: false,
    },
    {
      name: "Pro",
      description:
        "More advanced features available. Recommended for photography veterans and professionals.",
      price: 39,
      isFeatured: true,
    },
    {
      name: "Business",
      description:
        "Additional features available such as more detailed metrics. Recommended for business owners.",
      price: 99,
      isFeatured: false,
    },
  ],
  yearly: [
    {
      name: "Basic",
      description:
        "Includes basic usage of our platform. Recommended for new and aspiring photographers.",
      price: 190,
      isFeatured: false,
    },
    {
      name: "Pro",
      description:
        "More advanced features available. Recommended for photography veterans and professionals.",
      price: 390,
      isFeatured: true,
    },
    {
      name: "Business",
      description:
        "Additional features available such as more detailed metrics. Recommended for business owners.",
      price: 990,
      isFeatured: false,
    },
  ],
};

export const compareFeatures = [
  { label: "Unlimited Story Posting", basic: true, pro: true, business: true },
  { label: "Unlimited Photo Upload", basic: true, pro: true, business: true },
  { label: "Embedding Custom Content", basic: false, pro: true, business: true },
  { label: "Customize Metadata", basic: false, pro: true, business: true },
  { label: "Advanced Metrics", basic: false, pro: false, business: true },
  { label: "Photo Downloads", basic: false, pro: false, business: true },
  { label: "Search Engine Indexing", basic: false, pro: false, business: true },
  { label: "Custom Analytics", basic: false, pro: false, business: true },
];