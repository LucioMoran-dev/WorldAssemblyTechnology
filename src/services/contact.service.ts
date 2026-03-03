import { apiClient } from "@/lib/api";
import type { IContactDto, IContactResponse } from "@/types";

/**
 * Servicio de contacto
 * Endpoints del módulo /contact
 */
export const contactService = {
  /**
   * POST /contact - Enviar mensaje de contacto
   * Público - Envía email al usuario y al admin
   */
  sendMessage: async (data: IContactDto): Promise<IContactResponse> => {
    const response = await apiClient.post<IContactResponse>("/contact", data);
    return response.data;
  },
};
