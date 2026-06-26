import { faqItems } from "@/lib/seo/site";

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-beacon-border py-12 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-beacon-gray sm:text-base">
          Everything you need to know about Beacon&apos;s API health check,
          REST API testing, and API score.
        </p>

        <dl className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-beacon-border bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5"
            >
              <dt className="text-base font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-beacon-gray">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
