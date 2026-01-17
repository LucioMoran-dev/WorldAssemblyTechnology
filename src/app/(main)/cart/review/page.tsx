"use client";

import {
  Check,
  ChevronDown,
  CreditCard,
  Building2,
  Wallet,
  ChevronLeft,
  Edit2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function ReviewPaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [orderSummaryExpanded, setOrderSummaryExpanded] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const cartItems = [
    {
      id: "1",
      name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...",
      price: 3799.0,
      quantity: 1,
      image: "/msi-desktop-front.jpg",
    },
    {
      id: "2",
      name: "MSI MEG Trident X 10SD-1012AU Intel i7 10700K, 2070 SUPER...",
      price: 3799.0,
      quantity: 1,
      image: "/msi-laptop.jpg",
    },
  ];

  const shippingInfo = {
    email: "john.doe@example.com",
    name: "John Doe",
    address: "1234 Street Address, City, State 12345",
    phone: "+1 (234) 567-8900",
    shippingMethod: "Standard Rate - $21.00",
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 21.0;
  const tax = 1.91;
  const gst = 1.91;
  const total = subtotal + shipping + tax + gst;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handlePlaceOrder = () => {
    // Aquí iría la lógica para procesar el pago
    alert("Pedido procesado con éxito!");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Revisión y Pago</h1>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-gray-300 bg-transparent px-6 text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center">
          <div className="flex items-center gap-4">
            {/* Step 1 - Completed */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                <Check className="h-5 w-5" />
              </div>
              <span className="font-semibold text-gray-900">Envío</span>
            </div>

            {/* Connector Line */}
            <div className="h-0.5 w-32 bg-blue-600" />

            {/* Step 2 - Active */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                2
              </div>
              <span className="font-semibold text-blue-600">
                Revisión y Pagos
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Review and Payment Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping Information Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Información de Envío</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
              <div className="grid gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2">
                <div>
                  <p className="mb-1 text-sm text-gray-600">Nombre Completo</p>
                  <p className="font-medium">{shippingInfo.name}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Email</p>
                  <p className="font-medium">{shippingInfo.email}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium">{shippingInfo.phone}</p>
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-600">Método de Envío</p>
                  <p className="font-medium">{shippingInfo.shippingMethod}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="mb-1 text-sm text-gray-600">
                    Dirección de Entrega
                  </p>
                  <p className="font-medium">{shippingInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold">Método de Pago</h2>

              {/* Payment Options */}
              <div className="mb-6 space-y-3">
                {/* Credit Card */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "credit-card"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === "credit-card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        Tarjeta de Crédito / Débito
                      </p>
                      <p className="text-sm text-gray-600">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "paypal"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">PayPal</p>
                      <p className="text-sm text-gray-600">
                        Pago rápido y seguro con PayPal
                      </p>
                    </div>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
                    paymentMethod === "bank"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-5 w-5 text-blue-600"
                  />
                  <div className="flex flex-1 items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 to-gray-700">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Transferencia Bancaria</p>
                      <p className="text-sm text-gray-600">
                        Pago directo desde tu cuenta bancaria
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "credit-card" && (
                <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Fecha de Vencimiento
                      </label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) =>
                          setExpiryDate(formatExpiryDate(e.target.value))
                        }
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) =>
                          setCvv(
                            e.target.value.replace(/\D/g, "").substring(0, 4)
                          )
                        }
                        placeholder="123"
                        maxLength={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal Info */}
              {paymentMethod === "paypal" && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm text-gray-700">
                    Serás redirigido a PayPal para completar tu pago de forma
                    segura después de confirmar el pedido.
                  </p>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === "bank" && (
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <p className="mb-3 text-sm text-gray-700">
                    Recibirás un email con los detalles de la cuenta bancaria
                    para realizar la transferencia.
                  </p>
                  <p className="text-xs text-gray-600">
                    Nota: Tu pedido será procesado una vez que recibamos la
                    confirmación de la transferencia.
                  </p>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              className="h-14 w-full bg-blue-600 text-lg font-semibold text-white hover:bg-blue-700"
            >
              Realizar Pedido - ${total.toLocaleString()}
            </Button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <svg
                className="h-5 w-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Pago 100% seguro y encriptado</span>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <button
                onClick={() => setOrderSummaryExpanded(!orderSummaryExpanded)}
                className="mb-4 flex w-full items-center justify-between"
              >
                <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${orderSummaryExpanded ? "rotate-180" : ""}`}
                />
              </button>

              {orderSummaryExpanded && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 text-sm">
                    <span className="font-medium">
                      {cartItems.length} Items en el Carrito
                    </span>
                  </div>

                  {/* Cart Items */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-200 pb-4"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded bg-gray-50 object-contain"
                      />
                      <div className="flex-1">
                        <p className="mb-1 line-clamp-2 text-sm text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Cant: {item.quantity}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Pricing Summary */}
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Envío</span>
                      <span className="font-semibold">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">GST (10%)</span>
                      <span className="font-semibold">${gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
