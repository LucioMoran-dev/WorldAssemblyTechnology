import AccountInformation from "@/components/dashboard/account.information";
import AddressBook from "@/components/dashboard/address.book";
import Characteristics from "@/components/dashboard/characteristics";
import CompareProducts from "@/components/dashboard/compare.products";
import MyWishList from "@/components/dashboard/my.wish.list";

function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Mi Panel</h1>

      <AccountInformation />

      <AddressBook />

      <CompareProducts />

      <MyWishList />

      <Characteristics />
    </div>
  );
}

export default Dashboard;
