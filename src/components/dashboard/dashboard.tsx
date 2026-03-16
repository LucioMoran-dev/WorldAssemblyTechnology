import AccountInformation from "@/components/dashboard/account-information";
import AddressBook from "@/components/dashboard/address-book";
import Characteristics from "@/components/dashboard/characteristics";
import MyWishList from "@/components/dashboard/my-wish-list";

function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-foreground text-3xl font-bold">Mi Panel</h1>

      <AccountInformation />

      <AddressBook />

      <MyWishList />

      <Characteristics />
    </div>
  );
}

export default Dashboard;
