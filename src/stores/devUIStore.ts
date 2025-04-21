import { create } from 'zustand';

type EstadoUI = {
  modalOpen: boolean;
  selectedDevId: number | null;

  toggleModal: () => void;
  setDevId: (id: number | null) => void;

  openForEdit: (id: number) => void;
  closeModal: () => void;

  // Estados y funciones para asignar proyectos
  asignacionModalOpen: boolean;
  devIdAsignar: number | null;
  abrirAsignacion: (id: number) => void;
  cerrarAsignacion: () => void;

  filtros: {
    nombre: string;
    estado: 'todos' | 'activo' | 'inactivo';
    experiencia: number | null;
    proyectos: number | null;
  };

  setFiltro: <K extends keyof EstadoUI['filtros']>(
    filtro: K,
    valor: EstadoUI['filtros'][K]
  ) => void;

  resetFiltros: () => void;
};

export const useDevUIStore = create<EstadoUI>((set) => ({
  modalOpen: false,
  selectedDevId: null,

  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
  setDevId: (id) => set({ selectedDevId: id }),

  openForEdit: (id) => set({ modalOpen: true, selectedDevId: id }),
  closeModal: () => set({ modalOpen: false, selectedDevId: null }),

  asignacionModalOpen: false,
  devIdAsignar: null,
  abrirAsignacion: (id) => set({ asignacionModalOpen: true, devIdAsignar: id }),
  cerrarAsignacion: () => set({ asignacionModalOpen: false, devIdAsignar: null }),

  filtros: {
    nombre: '',
    estado: 'todos',
    experiencia: null,
    proyectos: null,
  },

  setFiltro: (filtro, valor) =>
    set((state) => ({
      filtros: {
        ...state.filtros,
        [filtro]: valor,
      },
    })),

    resetFiltros: () =>
      set({
        filtros: {
          nombre: '',
          estado: 'todos',
          experiencia: null,
          proyectos: null,
        },
      }),
    
}));




