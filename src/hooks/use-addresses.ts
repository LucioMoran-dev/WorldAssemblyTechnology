'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { userService } from '@/services';
import type { CreateAddressDto, UpdateAddressDto } from '@/types';

/**
 * Hook para obtener todas mis direcciones
 */
export function useAddresses() {
  return useQuery({
    queryKey: ['addresses'],
    queryFn: userService.getMyAddresses,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

/**
 * Hook para crear nueva dirección
 */
export function useCreateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAddressDto) => userService.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Dirección creada exitosamente');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al crear dirección';
      toast.error(message);
    },
  });
}

/**
 * Hook para actualizar dirección
 */
export function useUpdateAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: UpdateAddressDto }) =>
      userService.updateAddress(addressId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Dirección actualizada exitosamente');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al actualizar dirección';
      toast.error(message);
    },
  });
}

/**
 * Hook para eliminar dirección
 */
export function useDeleteAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => userService.deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Dirección eliminada exitosamente');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al eliminar dirección';
      toast.error(message);
    },
  });
}

/**
 * Hook para marcar dirección como predeterminada
 */
export function useSetDefaultAddress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => userService.setDefaultAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Dirección predeterminada actualizada');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al actualizar dirección predeterminada';
      toast.error(message);
    },
  });
}
