"use client";

import { Mail, Play, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  useCampaigns,
  useCreateCampaign,
  useDeleteCampaign,
  useNewsletterStats,
  useSendCampaign,
  useSendMonthlyManual,
  useSendPromo,
} from "@/hooks";

export default function AdminNewsletterPage() {
  const { data: stats, isLoading: isLoadingStats } = useNewsletterStats();
  const { data: campaigns = [], isLoading: isLoadingCampaigns } = useCampaigns();

  const sendMonthlyManual = useSendMonthlyManual();
  const sendPromo = useSendPromo();
  const createCampaign = useCreateCampaign();
  const sendCampaign = useSendCampaign();
  const deleteCampaign = useDeleteCampaign();

  const [promoCode, setPromoCode] = useState("");

  const [campaignName, setCampaignName] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignBody, setCampaignBody] = useState("");

  const handleCreateCampaign = () => {
    if (!campaignName || !campaignSubject || !campaignTitle || !campaignBody) {
      return;
    }

    createCampaign.mutate({
      name: campaignName,
      subject: campaignSubject,
      title: campaignTitle,
      body: campaignBody,
      ctaText: "Ver mas",
      ctaUrl: "/",
      campaignType: "custom",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Gestion de newsletter</h1>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Estadisticas</h2>

        {isLoadingStats ? (
          <p className="text-sm text-gray-600">Cargando estadisticas...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-600">Total envios</p>
              <p className="text-xl font-bold">{stats?.total ?? 0}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-600">Enviados</p>
              <p className="text-xl font-bold">{stats?.sent ?? 0}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-600">Fallidos</p>
              <p className="text-xl font-bold">{stats?.failed ?? 0}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-600">Aperturas</p>
              <p className="text-xl font-bold">{stats?.opened ?? 0}</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-600">Clicks</p>
              <p className="text-xl font-bold">{stats?.clicked ?? 0}</p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Acciones rapidas</h2>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Codigo promo para envio masivo"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
          />
          <Button
            onClick={() => sendPromo.mutate({ promoCode: promoCode.trim().toUpperCase() })}
            disabled={sendPromo.isPending || !promoCode.trim()}
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar promo
          </Button>
        </div>

        <Button
          className="mt-3"
          variant="outline"
          onClick={() => sendMonthlyManual.mutate()}
          disabled={sendMonthlyManual.isPending}
        >
          <Mail className="mr-2 h-4 w-4" />
          Enviar mensual manual
        </Button>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Crear campania</h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Nombre interno"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Asunto"
            value={campaignSubject}
            onChange={(event) => setCampaignSubject(event.target.value)}
          />
          <input
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Titulo"
            value={campaignTitle}
            onChange={(event) => setCampaignTitle(event.target.value)}
          />
          <Button
            onClick={handleCreateCampaign}
            disabled={createCampaign.isPending}
            className="h-10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Crear campania
          </Button>
        </div>

        <textarea
          className="mt-3 min-h-24 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Contenido"
          value={campaignBody}
          onChange={(event) => setCampaignBody(event.target.value)}
        />
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Campanias</h2>

        {isLoadingCampaigns ? (
          <p className="text-sm text-gray-600">Cargando campanias...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-sm text-gray-600">No hay campanias creadas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Asunto</th>
                  <th className="px-3 py-2">Tipo</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-gray-100">
                    <td className="px-3 py-2">{campaign.name}</td>
                    <td className="px-3 py-2">{campaign.subject}</td>
                    <td className="px-3 py-2">{campaign.campaignType}</td>
                    <td className="px-3 py-2">{campaign.status}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => sendCampaign.mutate(campaign.id)}
                          disabled={sendCampaign.isPending}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteCampaign.mutate(campaign.id)}
                          disabled={deleteCampaign.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
