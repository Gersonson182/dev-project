import { useProjectsUIStore } from "@/stores/projectUIStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Props {
  onCrear: () => void;
}

export default function ProjectFilters({ onCrear }: Props) {
  const { nombre, estado, fechaInicio, fechaTermino, cantidadDevs, setFiltro, resetFiltros } =
    useProjectsUIStore();

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <Input
        placeholder="Nombre del proyecto"
        value={nombre}
        onChange={(e) => setFiltro("nombre", e.target.value)}
        className="w-48"
      />

      <Select value={estado} onValueChange={(val) => setFiltro("estado", val as "todos" | "activo" | "inactivo")}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="activo">Activo</SelectItem>
          <SelectItem value="inactivo">Inactivo</SelectItem>
        </SelectContent>
      </Select>

   
  <div className="flex flex-col sm:flex-row gap-4">

      <div className="flex flex-col">
      <label htmlFor="fechaInicio" className="text-sm text-muted-foreground mb-1"> Fecha de inicio</label>
                <Input
                  id="fechaInicio"
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFiltro("fechaInicio", e.target.value)}
                  className="w-44"
                />
       </div>
       <div className="flex flex-col">
                <label htmlFor="fechaTermino" className="text-sm text-muted-foreground mb-1">
                  Fecha de término
                </label>
                <Input
                  id="fechaTermino"
                  type="date"
                  value={fechaTermino}
                  onChange={(e) => setFiltro("fechaTermino", e.target.value)}
                  className="w-44"
                />
        </div>
  </div>

  <div className="flex flex-col">
   <label htmlFor="cantidadDevs" className="text-sm text-muted-foreground mb-1">
    Cantidad de devs
    </label>
      <Input
        id="cantidadDevs"
        type="number"
        min={0}
        value={cantidadDevs ?? ""}
        onChange={(e) => {const valor = e.target.value; setFiltro("cantidadDevs", valor === "" ? null : Number(valor))}}
        className="w-36"
      />
</div>

      <Button onClick={resetFiltros} variant="outline">
        Limpiar
      </Button>

      <Button onClick={onCrear}>Crear Proyecto</Button>
    </div>
  );
}
