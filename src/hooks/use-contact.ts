"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { contactService } from "@/services";
import type { IContactDto } from "@/types";
import { getUserFacingMessage } from "@/utils";

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
      toast.error(
        getUserFacingMessage(
          error,
          "Error al enviar el mensaje. Intenta nuevamente."
        )
      );
    },
  });
}
