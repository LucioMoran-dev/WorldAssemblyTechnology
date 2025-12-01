import { Button } from "../ui/button";

function ActionButtons() {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" className="border-gray-300 bg-transparent">
        Continue Shopping
      </Button>
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="border-black bg-black text-white hover:bg-gray-800"
        >
          Clear Shopping Cart
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800">
          Update Shopping Cart
        </Button>
      </div>
    </div>
  );
}

export default ActionButtons;
