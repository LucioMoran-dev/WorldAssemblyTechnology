"use client";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { contactService } from "@/services";
import type { IContactDto } from "@/types";

function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

/**
 * Mutation para enviar mensaje de contacto
 */
export function useSendContactMessage() {
  return useMutation({
    mutationFn: (data: IContactDto) => contactService.sendMessage(data),
    onSuccess: () => {
      toast.success(
        "¡Mensaje enviado exitosamente! Te contactaremos pronto."
      );
    },
    onError: (error: unknown) => {
      const message = isAxiosError(error)
        ? (error.response?.data as { message?: string })?.message ||
          "Error al enviar el mensaje. Intenta nuevamente."
        : "Error al enviar el mensaje. Intenta nuevamente.";
      toast.error(message);
    },
  });
}
