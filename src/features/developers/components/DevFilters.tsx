import { useDevUIStore } from "@/stores/devUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  onCrear: () => void;
};

export default function FiltrosDesarrollador({ onCrear }: Props) {
  const { filtros, setFiltro, resetFiltros } = useDevUIStore();

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      {/* Filtro por nombre */}
      <Input
        placeholder="Nombre del desarrollador"
        value={filtros.nombre}
        onChange={(e) => setFiltro("nombre", e.target.value)}
        className="w-48"
      />

      {/* Filtro por experiencia */}
      <div className="flex flex-col">
        <label htmlFor="experiencia" className="text-sm text-muted-foreground mb-1">
          Años de experiencia
        </label>
        <Input
          id="experiencia"
          type="number"
          value={filtros.experiencia ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setFiltro("experiencia", val === "" ? null : Number(val));
          }}
          className="w-36"
        />
      </div>

      {/* Filtro por cantidad de proyectos */}
      <div className="flex flex-col">
        <label htmlFor="proyectos" className="text-sm text-muted-foreground mb-1">
          N° de proyectos
        </label>
        <Input
          id="proyectos"
          type="number"
          value={filtros.proyectos ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setFiltro("proyectos", val === "" ? null : Number(val));
          }}
          className="w-36"
        />
      </div>

      {/* Filtro por estado */}
      <Select
        value={filtros.estado}
        onValueChange={(val) => setFiltro("estado", val as "todos" | "activo" | "inactivo")}
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="activo">Activos</SelectItem>
          <SelectItem value="inactivo">Inactivos</SelectItem>
        </SelectContent>
      </Select>

      {/* Botones */}
      <Button variant="outline" onClick={resetFiltros}>
        Limpiar
      </Button>

      <Button onClick={onCrear}>Crear Dev</Button>
    </div>
  );
}



