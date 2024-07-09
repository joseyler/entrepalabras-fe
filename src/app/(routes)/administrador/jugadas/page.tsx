"use client";
import { withRoles } from "@/app/components/HOC/WithRoles";
import { HeaderOrdenado } from "@/app/components/tabla/HeaderOrdenado";
import { ICriterioBusquedaPalabra } from "@/app/model/palabras/ICriterioBusquedaPalabras";
import { cargarJugadasBE, exportJugadasBE } from "@/app/services/jugadas";
import { useEffect, useState } from "react";
import FileSaver from 'file-saver';


const PageJugadas = () => {

  const [jugadas, setJugadas] = useState<any[]>([]);
  const [paginacion, setPaginacion] = useState({
    pagina: 1,
    tamanio: 20,
    registrosTotales: 0,
  });
  const [criterio, setCriterio] = useState<ICriterioBusquedaPalabra>({
    tamanio: 20,
    pagina: 1,
    orderBy: 'fecha',
    direction: 'desc',
  });
  const [ordenamientoActual, setOrdenamientoActual] = useState<any>({
    fecha: 2,
    palabra: 0,
    maxIntentos: 0,
    cantidadJugadas: 0,
  });

  const loadJugadas = async () => {
    const responseJugadas = await cargarJugadasBE(criterio);
    console.log(responseJugadas);
    setJugadas(responseJugadas.data);
    setPaginacion(responseJugadas.paginado);
  }

  useEffect(() => {
    loadJugadas();
  }, [criterio]);

  const exportarJugadas = async () => {
    try {
      const responseJugadas = await exportJugadasBE(criterio);
      const blob = new Blob([responseJugadas.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, `Jugadas.xlsx`);
    } catch (error: any) {
      alert("Error exportando!!")
    } 
  }

  const ordernar = (key: string): void => {
    const ordActual = ordenamientoActual[key];
    let nuevoOrd = 0;
    switch (ordActual) {
      case 0:
        nuevoOrd = 1;
        break;
      case 1:
        nuevoOrd = 2;
        break;
      default:
        nuevoOrd = 1;
        break;
    }
    const nuevoOrdenamientoActual: any = {
      fecha: 0,
      palabra: 0,
      maxIntentos: 0,
      cantidadJugadas: 0,
    };
    nuevoOrdenamientoActual[key] = nuevoOrd;
    setOrdenamientoActual(nuevoOrdenamientoActual);
  
    setCriterio({
      ...criterio,
      direction: nuevoOrd == 1 ? 'asc' : 'desc',
      orderBy: key,
    });

  }

  const setPagina = (nuevaPagina:number) => {
    if (nuevaPagina > 0 && nuevaPagina <= Math.ceil(paginacion.registrosTotales / paginacion.tamanio)) {
      setCriterio({
        ...criterio,
        pagina: nuevaPagina,
      });
    }
  }

  return (
    <>
      <div className="palabra-del-dia">
        <span>Jugadas</span>
      </div>
      <div className="mt-4 px-5 d-flex justify-content-end">
        <div>{`Mostrando ${(paginacion.tamanio * (paginacion.pagina - 1)) + 1} a ${(paginacion.tamanio * (paginacion.pagina))} de ${paginacion.registrosTotales}`}</div>
        <div className="d-flex flex-row flex-nowrap ms-3">
          <button
             type="button"
             className="transparent"
             onClick={() => setPagina(paginacion.pagina - 1 )}
          >Anterior</button>
          <div className="paginaActual mx-2">{paginacion.pagina}</div>
          <button
             type="button"
             className="transparent"
             onClick={() => setPagina(paginacion.pagina + 1 )}
          >Siguiente</button>
        </div>
      </div>
      <div className="mt-2 px-5 d-flex justify-content-end">
        <button
             type="button"
             className="transparent"
             onClick={() => exportarJugadas()}
          >Exportar XLS</button>
      </div>
      <div className="mt-2 px-5">
        <table className="table table-dark table-bordered table-striped">
          <thead>
            <th>
              <HeaderOrdenado
                titulo="Fecha"
                key="fecha"
                ordenamientoColumna={ordenamientoActual.fecha}
                onClickHeader={() => ordernar("fecha")}
              />
            </th>
            <th>
              <HeaderOrdenado
                titulo="Palabra"
                key="palabra"
                ordenamientoColumna={ordenamientoActual.palabra}
                onClickHeader={() => ordernar("palabra")}
              />
            </th>
            <th>
              <HeaderOrdenado
                titulo="Intentos Maximos"
                key="maxIntentos"
                ordenamientoColumna={ordenamientoActual.maxIntentos}
                onClickHeader={() => ordernar("maxIntentos")}
              />
            </th>
            <th>
              <HeaderOrdenado
                titulo="Jugadas Realizadas"
                key="cantidadJugadas"
                ordenamientoColumna={ordenamientoActual.cantidadJugadas}
                onClickHeader={() => ordernar("cantidadJugadas")}
              />
            </th>
          </thead>
          <tbody>
            {jugadas.length > 0 && jugadas.map((jugada) => (
              <tr key={jugada.fecha}>
                <td>{new Date(jugada.fecha).toLocaleDateString()}</td>
                <td>{jugada.palabra}</td>
                <td>{jugada.maxIntentos}</td>
                <td>{jugada.cantidadJugadas}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="mt-4 px-5 d-flex justify-content-end">
        <div>{`Mostrando ${(paginacion.tamanio * (paginacion.pagina - 1)) + 1} a ${(paginacion.tamanio * (paginacion.pagina))} de ${paginacion.registrosTotales}`}</div>
        <div className="d-flex flex-row flex-nowrap ms-3">
          <button
             type="button"
             className="transparent"
             onClick={() => setPagina(paginacion.pagina - 1 )}
          >Anterior</button>
          <div className="paginaActual mx-2">{paginacion.pagina}</div>
          <button
             type="button"
             className="transparent"
             onClick={() => setPagina(paginacion.pagina + 1 )}
          >Siguiente</button>
        </div>
      </div>
    </>
  );
}

export default withRoles(PageJugadas, ['ADM'], '/')
