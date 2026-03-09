import { apiClient } from "@/lib/api";
import type {
  IPaymentPreference,
  ICreatePreferenceDto,
  IPayment,
  IPaymentStatusResponse,
  IPaymentListParams,
  IPaginatedResponse,
} from "@/types";

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
    const response = await apiClient.get<IPaginatedResponse<IPayment>>(
      "/payments/my-payments",
      { params }
    );
    return response.data;
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
    const response = await apiClient.get<IPaginatedResponse<IPayment>>(
      "/payments",
      { params }
    );
    return response.data;
  },

  /**
   * GET /payments/order/:orderId - Pagos de una orden específica (Admin)
   * Requiere: ADMIN+
   */
  getPaymentsByOrder: async (orderId: string): Promise<IPayment[]> => {
    const response = await apiClient.get<IPayment[]>(
      `/payments/order/${orderId}`
    );
    return response.data;
  },
};
