import { Edit, Star, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { IReviews } from "@/types";

function MyReviews() {
  const reviews: IReviews[] = [];
  return (
    <>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review: IReviews) => (
            <div
              key={review.id}
              className="rounded-lg border border-gray-200 p-6"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 font-bold text-gray-900">
                    {review.productName}
                  </h3>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-12 text-center">
          <Star className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No has escrito reseñas aún
          </h3>
          <p className="mb-6 text-gray-600">
            Comparte tu experiencia con otros clientes escribiendo reseñas de
            productos
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/dashboard/orders">Ver Mis Pedidos</Link>
          </Button>
        </div>
      )}
    </>
  );
}
export default MyReviews;
