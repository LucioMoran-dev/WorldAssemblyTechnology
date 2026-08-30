import MyReviews from "./my.reviews";

function Reviews() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Mis Reseñas de Productos
      </h1>
      <MyReviews />
    </div>
  );
}

export default Reviews;
