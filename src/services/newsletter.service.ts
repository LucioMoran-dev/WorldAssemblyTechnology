import { apiClient } from "@/lib/api";
import type {
  INewsletterSubscribeDto,
  INewsletterStats,
  ICampaign,
  ICreateCampaignDto,
  IUpdateCampaignDto,
  ISendPromoDto,
  ICampaignListParams,
} from "@/types";

/**
 * Servicio de Newsletter y Campañas
 * Endpoints del módulo /newsletter
 */
export const newsletterService = {
  // ===== PÚBLICO =====

  /**
   * POST /newsletter/subscribe - Suscribirse al newsletter
   * Público
   */
  subscribe: async (
    data: INewsletterSubscribeDto
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/newsletter/subscribe",
      data
    );
    return response.data;
  },

  /**
   * GET /newsletter/unsubscribe - Desuscribirse
   * Público (recibe token por query param)
   */
  unsubscribe: async (
    token: string
  ): Promise<{ message: string; email: string }> => {
    const response = await apiClient.get<{ message: string; email: string }>(
      "/newsletter/unsubscribe",
      { params: { token } }
    );
    return response.data;
  },

  // ===== ADMIN =====

  /**
   * GET /newsletter/stats - Estadísticas de tracking
   * Requiere: ADMIN+
   */
  getStats: async (): Promise<INewsletterStats> => {
    const response =
      await apiClient.get<INewsletterStats>("/newsletter/stats");
    return response.data;
  },

  /**
   * POST /newsletter/send-monthly-manual - Envío mensual manual
   * Requiere: ADMIN+
   */
  sendMonthlyManual: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      "/newsletter/send-monthly-manual"
    );
    return response.data;
  },

  /**
   * POST /newsletter/send-promo - Envío masivo promocional
   * Requiere: ADMIN+
   */
  sendPromo: async (
    data: ISendPromoDto
  ): Promise<{ message: string; enqueuedCount: number }> => {
    const response = await apiClient.post<{
      message: string;
      enqueuedCount: number;
    }>("/newsletter/send-promo", data);
    return response.data;
  },

  // ===== CAMPAÑAS (ADMIN) =====

  /**
   * GET /newsletter/campaigns - Listar campañas
   * Requiere: ADMIN+
   */
  getCampaigns: async (params?: ICampaignListParams): Promise<ICampaign[]> => {
    const response = await apiClient.get<ICampaign[]>(
      "/newsletter/campaigns",
      { params }
    );
    return response.data;
  },

  /**
   * GET /newsletter/campaigns/:id - Detalle de campaña
   * Requiere: ADMIN+
   */
  getCampaign: async (id: string): Promise<ICampaign> => {
    const response = await apiClient.get<ICampaign>(
      `/newsletter/campaigns/${id}`
    );
    return response.data;
  },

  /**
   * POST /newsletter/campaigns - Crear campaña
   * Requiere: ADMIN+
   */
  createCampaign: async (data: ICreateCampaignDto): Promise<ICampaign> => {
    const response = await apiClient.post<ICampaign>(
      "/newsletter/campaigns",
      data
    );
    return response.data;
  },

  /**
   * PATCH /newsletter/campaigns/:id - Editar campaña
   * Requiere: ADMIN+
   */
  updateCampaign: async (
    id: string,
    data: IUpdateCampaignDto
  ): Promise<ICampaign> => {
    const response = await apiClient.patch<ICampaign>(
      `/newsletter/campaigns/${id}`,
      data
    );
    return response.data;
  },

  /**
   * DELETE /newsletter/campaigns/:id - Eliminar campaña (soft delete)
   * Requiere: ADMIN+
   */
  deleteCampaign: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      `/newsletter/campaigns/${id}`
    );
    return response.data;
  },

  /**
   * POST /newsletter/campaigns/:id/send - Enviar campaña
   * Requiere: ADMIN+
   */
  sendCampaign: async (
    id: string
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      `/newsletter/campaigns/${id}/send`
    );
    return response.data;
  },
};
