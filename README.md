# dev-project
Aplicación web construida con React + TypeScript para gestionar desarrolladores y sus asignaciones a proyectos. Incluye funcionalidades de filtrado, CRUD completo, confirmaciones visuales, dashboard de métricas, y despliegue en Netlify.

Demo de programa
https://magical-madeleine-67b0f9.netlify.app/

Video de programa
Link: https://youtu.be/ymfzZIAyWUo

- INSTRUCCIONES DE INSTALACION Y EJECUCION
  1) git clone https://github.com/Gerson182/dev-project.git
     
     cd dev-project
     
  3) Instalar Dependencia: NPM INSTALL
  4) Crear archivo .ENV
     
     VITE_API_BASE_URL:https://apipruebas.rbu.cl/api
     
     VITE_API_TOKEN: (La que se dio en el examen)
     
  6) Ejecutar en Modo Desarrollo: NPM RUN DEV
     
  8) Acceder al navegador: http://localhost:5173
 
 - TECNOLOGIAS UTILIZADAS

   React + TypeScript
   REACT-ROUTER
   VITE
   ZUSTAND
   REACT QUERY (TANSTACK)
   ZOD (COMPLEMENTACION CON TYPESCRIPT)
   TAILWINDCSS + SHADCN UI


ARQUITECTURA DE PROYECTO (DRAW FOLDER STRUCTURE)
```
└── 📁src
    └── 📁components --> COMPONENTES GLOBALES
        └── ConfirmDialog.tsx
        └── NotificationContext.tsx
        └── Sidebar.tsx
        └── 📁ui --> SHADCN UI
            └── badge.tsx
            └── button.tsx
            └── card.tsx
            └── checkbox.tsx
            └── dialog.tsx
            └── input.tsx
            └── select.tsx
            └── skeleton.tsx
        └── useNotifications.ts
    └── 📁features --> AQUI ESTAN TODOS LA LOGICA DE DESARROLLO SEPARADOS POR DASHBOARD - DEVELOPERS Y PROJECTS
        └── 📁dashboard
            └── api.ts
            └── 📁components
                └── DashboardMetrics.tsx
                └── GestionCards.tsx
                └── MetricCard.tsx
            └── queries.ts
            └── schema.ts
        └── 📁developers
            └── api.ts
            └── 📁components
                └── DeveloperDetailsPage.tsx
                └── DevFilters.tsx
                └── DevFormModalCreate.tsx
                └── DevFormModalEdit.tsx
                └── DevProjectModal.tsx
                └── DevRow.tsx
                └── DevTable.tsx
            └── 📁hooks
                └── useCantidadProyectosMap.ts
            └── index.tsx
            └── mutations.ts
            └── queries.ts
            └── schema.ts
        └── 📁projects
            └── api.ts
            └── 📁components
                └── ProjectAssignModal.tsx
                └── ProjectDetails.tsx
                └── ProjectFilters.tsx
                └── ProjectFormModalCreate.tsx
                └── ProjectFormModalEdit.tsx
                └── ProjectRow.tsx
                └── ProjectTable.tsx
            └── index.tsx
            └── mutations.ts
            └── queries.ts
            └── schema.ts
    └── 📁layout
        └── AppLayout.tsx
    └── 📁lib
        └── utils.ts
    └── 📁services --> AQUI SE ALMACENA LAS APIS
        └── apiClient.ts
        └── queryClient.ts --> INSTANCIA GLOBAL DEL CLIENTE TANSTACK
    └── 📁stores --> STORE DE ZUSTAND GLOBAL
        └── devUIStore.ts
        └── projectUIStore.ts
    └── 📁utils --> FORMATEAR RUT CHILENO
        └── rutChileno.tsx
    └── 📁views ---> PAGINAS PRINCIPALES
        └── DashBoardView.tsx
        └── DesarrolladorView.tsx
        └── ProyetoView.tsx
    └── index.css
    └── main.tsx
    └── router.tsx ---> SE UTILIZO REACT ROUTER PARA NAVEGAR ENTREPAGINAS
    └── vite-env.d.ts
```

DESCRIPCIONES TECNICAS
1) ZOD + TYPESCRIPT PARA VALIDACIONES ESTRICTAS Y TIPADO SEGURO
2) ZUSTAND PARA MANEJAR MODALES, FILTROS, ESTADOS UI
3) REACT QUERY PARA FETCHING, CACHE, MANEJO DE ERRORES
4) CONFIRMACIONES VISUALES Y TOAST PERSONALIZADOS PARA ACCIONES SENSIBLES
5) ORDENAMIENTO DE ELEMENTOS INACTIVOS (CUANDO SE DESACTIVA QUEDA AL FINAL DE LA TABLA YA SEA EN PROYECTOS Y DEV'S)
6) MODULARIDAD TOTAL FEATURES / (CONSULTAS, MUTACIONES, SCHEMAS, COMPONENTES)

CONSIDERACIONES ADICIONALES
1) ESTRUCTURA ESCALABLE PARA MAS ENTIDADES A FUTURO
2) UI RESPONSIVA CON TAILWINDCSS
3) USOD DE SHADCN/UI PARA UNA INTERFAZ LIMPIA Y ACCESIBLE
4) DASHBOARD CON TARJETAS DE ACCION PARA NAVEGAR HACIA GESTION DE PROYECTOS Y DESARROLLADORES

-------------------------------------
REFLEXION PERSONAL SOBRE APRENDIZAJE
- Este proyecto fue una experiencia muy enriquecedora ya que me permitio trabajar por primera vez con React Query. A diferencia de mi proyecto free-lance (Doña Aurora) donde utilice Redux toolkit para manejar tanto el estado global como las llamadas a API, React query me permitio seprara mejor las responsabilidades, enfocandome solamente en el data fetching, el manejo automatico del cache y el estado de carga/error sin tener que gestioner reducers ni acciones manualmente.

Disfrute mucho la fluidez con la que RQ se integra en componentes y como me ayudó a simplificar la lógica asociada al estado del servidor. Pude notar con RQ reduce el boilerplate significativamente y hace que la UI esté siempre sincronizada con los datos remotos de forma intuitiva.

En resumen, fue un salto que complementó muy bien lo aprendido anteriormente y me abrió nuevas posibilidades sobre cómo escalar aplicaciones web modernas con mayor orden y simplicidad.
-------------------------------------------

AUTOR: GERSON EDUARDO ISAI MARTINEZ LETELIER :)

