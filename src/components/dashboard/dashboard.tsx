import AccountInformation from "@/components/dashboard/account-information";
import AddressBook from "@/components/dashboard/address-book";
import Characteristics from "@/components/dashboard/characteristics";
import MyStats from "@/components/dashboard/my-stats";
import MyWishList from "@/components/dashboard/my-wish-list";

function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Mi Panel</h1>

      {/* Métricas reales del usuario (GET /users/stats/me) */}
      <MyStats />

      <AccountInformation />

      <AddressBook />

      <MyWishList />

      <Characteristics />
    </div>
  );
}

export default Dashboard;
