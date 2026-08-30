"use client";

import { Mail, Play, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";

import { ActionDialog } from "@/components/ui/action-dialog";
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
import type { CampaignType } from "@/types";

export default function AdminNewsletterPage() {
  const { data: stats, isLoading: isLoadingStats } = useNewsletterStats();
  const { data: campaigns = [], isLoading: isLoadingCampaigns } =
    useCampaigns();

  const sendMonthlyManual = useSendMonthlyManual();
  const sendPromo = useSendPromo();
  const createCampaign = useCreateCampaign();
  const sendCampaign = useSendCampaign();
  const deleteCampaign = useDeleteCampaign();

  const [promoCode, setPromoCode] = useState("");
  const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null);

  const [campaignName, setCampaignName] = useState("");
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignTitle, setCampaignTitle] = useState("");
  const [campaignBody, setCampaignBody] = useState("");
  // Antes estaban hardcodeados ("Ver mas", "/", "custom"): ahora son
  // editables, que es lo que hace útil el botón del email.
  const [campaignCtaText, setCampaignCtaText] = useState("Ver más");
  const [campaignCtaUrl, setCampaignCtaUrl] = useState("/");
  const [campaignType, setCampaignType] = useState<CampaignType>("custom");

  const resetCampaignForm = () => {
    setCampaignName("");
    setCampaignSubject("");
    setCampaignTitle("");
    setCampaignBody("");
    setCampaignCtaText("Ver más");
    setCampaignCtaUrl("/");
    setCampaignType("custom");
  };

  const handleCreateCampaign = () => {
    if (!campaignName || !campaignSubject || !campaignTitle || !campaignBody) {
      return;
    }

    createCampaign.mutate(
      {
        name: campaignName,
        subject: campaignSubject,
        title: campaignTitle,
        body: campaignBody,
        ctaText: campaignCtaText,
        ctaUrl: campaignCtaUrl,
        campaignType,
      },
      { onSuccess: resetCampaignForm }
    );
  };

  const handleConfirmDeleteCampaign = async () => {
    if (!deleteCampaignId) return;
    await deleteCampaign.mutateAsync(deleteCampaignId);
    setDeleteCampaignId(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Gestión de newsletter
      </h1>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Estadisticas
        </h2>

        {isLoadingStats ? (
          <p className="text-sm text-muted-foreground">
            Cargando estadisticas...
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Total envios</p>
              <p className="text-xl font-bold">{stats?.total ?? 0}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Enviados</p>
              <p className="text-xl font-bold">{stats?.sent ?? 0}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Fallidos</p>
              <p className="text-xl font-bold">{stats?.failed ?? 0}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Aperturas</p>
              <p className="text-xl font-bold">{stats?.opened ?? 0}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">Clicks</p>
              <p className="text-xl font-bold">{stats?.clicked ?? 0}</p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Acciones rapidas
        </h2>

        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Codigo promo para envio masivo"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
          />
          <Button
            onClick={() =>
              sendPromo.mutate({ promoCode: promoCode.trim().toUpperCase() })
            }
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

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Crear campania
        </h2>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Nombre interno"
            value={campaignName}
            onChange={(event) => setCampaignName(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Asunto"
            value={campaignSubject}
            onChange={(event) => setCampaignSubject(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Titulo"
            value={campaignTitle}
            onChange={(event) => setCampaignTitle(event.target.value)}
          />
          <select
            className="rounded border border-border bg-background px-3 py-2 text-foreground"
            value={campaignType}
            onChange={(event) =>
              setCampaignType(event.target.value as CampaignType)
            }
          >
            <option value="custom">Tipo: Personalizada</option>
            <option value="monthly">Tipo: Mensual</option>
            <option value="promo">Tipo: Promoción</option>
          </select>
          {/* Texto y destino del botón del email */}
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Texto del botón (ej: Ver ofertas)"
            value={campaignCtaText}
            onChange={(event) => setCampaignCtaText(event.target.value)}
          />
          <input
            className="rounded border border-border px-3 py-2"
            placeholder="Link del botón (ej: /products/catalog/laptops)"
            value={campaignCtaUrl}
            onChange={(event) => setCampaignCtaUrl(event.target.value)}
          />
        </div>

        <textarea
          className="mt-3 min-h-24 w-full rounded border border-border px-3 py-2"
          placeholder="Contenido"
          value={campaignBody}
          onChange={(event) => setCampaignBody(event.target.value)}
        />

        <Button
          onClick={handleCreateCampaign}
          disabled={createCampaign.isPending}
          className="mt-3"
        >
          <Plus className="mr-2 h-4 w-4" />
          Crear campania
        </Button>
      </section>

      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          Campanias
        </h2>

        {isLoadingCampaigns ? (
          <p className="text-sm text-muted-foreground">Cargando campanias...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No hay campanias creadas.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-3 py-2">Nombre</th>
                  <th className="px-3 py-2">Asunto</th>
                  <th className="px-3 py-2">Tipo</th>
                  <th className="px-3 py-2">Estado</th>
                  <th className="px-3 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-border">
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
                          onClick={() => setDeleteCampaignId(campaign.id)}
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

      <ActionDialog
        open={Boolean(deleteCampaignId)}
        onOpenChange={(open) => {
          if (!open) setDeleteCampaignId(null);
        }}
        title="Eliminar campania"
        description="Esta accion eliminara la campania seleccionada."
        confirmLabel="Eliminar"
        variant="destructive"
        isPending={deleteCampaign.isPending}
        onConfirm={handleConfirmDeleteCampaign}
      />
    </div>
  );
}
