"use client";

import { useState } from "react";

function ReceiveNewsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  return (
    <div className="mb-6 flex items-center gap-3 rounded-lg bg-blue-50 p-4">
      <input
        type="checkbox"
        id="newsletter"
        checked={isSubscribed}
        onChange={(e) => setIsSubscribed(e.target.checked)}
        className="h-5 w-5 rounded border-gray-300"
      />
      <label
        htmlFor="newsletter"
        className="cursor-pointer text-sm text-gray-700"
      >
        Sí, quiero recibir el boletín informativo y estar al tanto de las
        últimas novedades
      </label>
    </div>
  );
}

export default ReceiveNewsletter;
