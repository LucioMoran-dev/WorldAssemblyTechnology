import { Button } from "@/components/ui/button";

interface TestimonialProps {
  quote: string;
  author: string;
  activeSlide?: number;
  totalSlides?: number;
}

export function Testimonial({
  quote,
  author,
  activeSlide = 0,
  totalSlides = 3,
}: TestimonialProps) {
  return (
    <section className="border-y border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center md:p-12">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="mb-6 text-lg leading-relaxed text-gray-700">
            {quote}
          </blockquote>
          <cite className="text-sm font-semibold text-blue-600">
            {author}
          </cite>
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === activeSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            className="mt-6 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Déjanos tu Reseña
          </Button>
        </div>
      </div>
    </section>
  );
}
