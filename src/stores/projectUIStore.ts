import { create } from "zustand";

type EstadoFiltrosProyectos = {
  // Filtros
  nombre: string;
  estado: "todos" | "activo" | "inactivo";
  fechaInicio: string;
  fechaTermino: string;
  cantidadDevs: number | null;

  setFiltro: <K extends keyof EstadoFiltrosProyectos>(
    key: K,
    valor: EstadoFiltrosProyectos[K]
  ) => void;

  resetFiltros: () => void;

  // Editar
  isEditModalOpen: boolean;
  proyectoIdEditar: number | null;
  abrirEditModal: (id: number) => void;
  cerrarEditModal: () => void;

  // Asignar
  isAssignModalOpen: boolean;
  abrirAssignModal: (id: number) => void;
  cerrarAssignModal: () => void;
};

export const useProjectsUIStore = create<EstadoFiltrosProyectos>((set) => ({
  // Filtros
  nombre: "",
  estado: "todos",
  fechaInicio: "",
  fechaTermino: "",
  cantidadDevs: null,

  setFiltro: (key, valor) =>
    set((state) => ({
      ...state,
      [key]: valor,
    })),

  resetFiltros: () =>
    set((state) => ({
      ...state,
      nombre: "",
      estado: "todos",
      fechaInicio: "",
      fechaTermino: "",
      cantidadDevs: null,
    })),

  // Editar
  isEditModalOpen: false,
  proyectoIdEditar: null,

  abrirEditModal: (id) =>
    set({
      isEditModalOpen: true,
      proyectoIdEditar: id,
    }),

  cerrarEditModal: () =>
    set({
      isEditModalOpen: false,
      proyectoIdEditar: null,
    }),

  // Asignar
  isAssignModalOpen: false,

  abrirAssignModal: (id) =>
    set({
      isAssignModalOpen: true,
      proyectoIdEditar: id,
    }),

  cerrarAssignModal: () =>
    set({
      isAssignModalOpen: false,
      proyectoIdEditar: null,
    }),
}));
