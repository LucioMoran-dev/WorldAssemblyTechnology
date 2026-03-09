import WishlistItem from "./wishlist.item";

function Wishlist() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Mi Lista de Deseos</h1>
      <WishlistItem />
    </div>
  );
}

export default Wishlist;

