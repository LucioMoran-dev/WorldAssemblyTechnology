function CartTableHeader() {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-border p-4 text-sm font-medium">
      <div className="col-span-5">Producto</div>
      <div className="col-span-2 text-center">Precio</div>
      <div className="col-span-2 text-center">Cantidad</div>
      <div className="col-span-2 text-center">Subtotal</div>
      <div className="col-span-1" />
    </div>
  );
}

export default CartTableHeader;
