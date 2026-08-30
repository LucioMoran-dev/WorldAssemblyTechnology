import { apiClient } from "@/lib/api";
import type {
  IPaymentPreference,
  ICreatePreferenceDto,
  IPayment,
  IPaymentApiShape,
  IPaymentStatusResponse,
  IPaymentListParams,
  IPaginatedResponse,
} from "@/types";

function normalizePayment(raw: IPaymentApiShape): IPayment {
  return {
    id: raw.id ?? "",
    orderId: raw.orderId ?? raw.order_id ?? "",
    userId: raw.userId ?? raw.user_id,
    mercadoPagoId: raw.paymentId ?? raw.payment_id,
    amount: Number(raw.amount ?? 0),
    status: raw.status as IPayment["status"],
    paymentTypeId: raw.paymentTypeId ?? raw.payment_type_id,
    paymentMethodId: raw.paymentMethodId ?? raw.payment_method_id,
    dateApproved: raw.dateApproved ?? raw.date_approved,
    createdAt: raw.createdAt ?? raw.created_at ?? "",
    updatedAt: raw.updatedAt ?? raw.updated_at,
  };
}

/**
 * Servicio de pagos (MercadoPago)
 * Endpoints del módulo /payments
 */
export const paymentService = {
  /**
   * POST /payments/create-preference - Crear preferencia de pago MercadoPago
   * Requiere: Autenticación (cualquier rol)
   */
  createPreference: async (
    data: ICreatePreferenceDto
  ): Promise<IPaymentPreference> => {
    const response = await apiClient.post<IPaymentPreference>(
      "/payments/create-preference",
      data
    );
    return response.data;
  },

  /**
   * GET /payments/my-payments - Obtener mis pagos (paginado)
   * Requiere: Autenticación (cualquier rol)
   */
  getMyPayments: async (
    params?: IPaymentListParams
  ): Promise<IPaginatedResponse<IPayment>> => {
    const response = await apiClient.get<IPaginatedResponse<IPaymentApiShape>>(
      "/payments/my-payments",
      { params }
    );
    return {
      ...response.data,
      items: (response.data.items ?? []).map(normalizePayment),
    };
  },

  /**
   * GET /payments/status/:paymentId - Estado actual del pago desde MercadoPago
   * Requiere: CLIENT+
   */
  getPaymentStatus: async (
    paymentId: string
  ): Promise<IPaymentStatusResponse> => {
    const response = await apiClient.get<IPaymentStatusResponse>(
      `/payments/status/${paymentId}`
    );
    return response.data;
  },

  /**
   * GET /payments - Listar todos los pagos (Admin, paginado)
   * Requiere: ADMIN+
   */
  getAllPayments: async (
    params?: IPaymentListParams
  ): Promise<IPaginatedResponse<IPayment>> => {
    const response = await apiClient.get<IPaginatedResponse<IPaymentApiShape>>(
      "/payments",
      { params }
    );
    return {
      ...response.data,
      items: (response.data.items ?? []).map(normalizePayment),
    };
  },

  /**
   * GET /payments/order/:orderId - Pagos de una orden específica (Admin)
   * Requiere: ADMIN+
   */
  getPaymentsByOrder: async (orderId: string): Promise<IPayment[]> => {
    const response = await apiClient.get<
      IPaymentApiShape | IPaymentApiShape[] | null
    >(`/payments/order/${orderId}`);

    const raw = response.data;
    if (!raw) return [];
    const list = Array.isArray(raw) ? raw : [raw];
    return list.filter((p) => p && p.id).map(normalizePayment);
  },
};
