interface ProjectsProps {
  preview?: boolean;
}

export const ProjectsBlock = ({ preview = false }: ProjectsProps) => (
  <div className={`${preview ? 'scale-75 pointer-events-none' : ''} bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-blue-200 dark:border-gray-600`}>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Mis Proyectos</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h4 className="font-semibold text-gray-800 dark:text-white">Proyecto 1</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Descripción del proyecto 1</p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h4 className="font-semibold text-gray-800 dark:text-white">Proyecto 2</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">Descripción del proyecto 2</p>
      </div>
    </div>
  </div>
);