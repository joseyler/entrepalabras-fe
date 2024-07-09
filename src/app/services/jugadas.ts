"use client";

import { ICriterioBusquedaPalabra } from "../model/palabras/ICriterioBusquedaPalabras";
import clienteAxios from "./axios";

export async function cargarJugadasBE(criterio: ICriterioBusquedaPalabra):Promise<any> {
  try {
    const response = await clienteAxios.get("/admin/palabras/jugadasdiarias", {
      params: criterio,
    });
    return response.data;
  } catch (e) {
    return [];
  }
}

export async function exportJugadasBE(criterio: ICriterioBusquedaPalabra):Promise<any> {
  try {
    const response = await clienteAxios.get("/admin/palabras/jugadasdiarias/export/xls", {
      params: criterio,
      responseType: 'blob'
    });
    return response;
  } catch (e) {
    return [];
  }
}


