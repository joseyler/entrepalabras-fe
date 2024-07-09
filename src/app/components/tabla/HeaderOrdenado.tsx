/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useState } from "react";


export const HeaderOrdenado = (props: any) => {

  const {
    titulo,
    key,
    ordenamientoColumna,
    onClickHeader,
  } = props;

  return (
    <button
      type="button"
      onClick={() => onClickHeader()}
      className="transparent w-100"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>{titulo}</div>
        <div>
          {ordenamientoColumna == 1 && (
            <img src="/up.png" alt="Ordenado ascendente" style={{ width: '20px' }} />
          )}
          {ordenamientoColumna == 2 && (
            <img src="/down.png" alt="Ordenado descendente" style={{ width: '20px' }} />
          )}
          {ordenamientoColumna == 0 && (
            <img src="/down.png" alt="Ordenado descendente" style={{ width: '20px', visibility: 'hidden' }} />
          )}
        </div>
      </div>
    </button>
  );
};
