import OrderMap from "./order.map";

function Order() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Mis Pedidos</h1>
      <OrderMap />
    </div>
  );
}

export default Order;
