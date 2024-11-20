import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp, Users, AlertTriangle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const EstadisticasIncidentes: React.FC = () => {
  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  
  const datosBarras = {
    labels: meses,
    datasets: [
      {
        label: 'Robos',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 55, 60, 65],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Vandalismo',
        data: [28, 48, 40, 19, 86, 27, 90, 35, 40, 45, 50, 55],
        backgroundColor: 'rgba(244, 63, 94, 0.8)',
      },
    ],
  };

  const datosTendencia = {
    labels: meses,
    datasets: [
      {
        label: 'Incidentes Totales',
        data: [120, 150, 180, 190, 210, 200, 220, 230, 250, 260, 280, 300],
        borderColor: 'rgb(99, 102, 241)',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
      },
    ],
  };

  const datosTipo = {
    labels: ['Robos', 'Vandalismo', 'Actividad Sospechosa', 'Accidentes', 'Otros'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(244, 63, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(148, 163, 184, 0.8)',
        ],
      },
    ],
  };

  const opcionesResponsivas = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="p-4 space-y-6">
      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Incidentes</p>
              <h3 className="text-2xl font-bold text-gray-900">2,547</h3>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 12% vs mes anterior</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Usuarios Activos</p>
              <h3 className="text-2xl font-bold text-gray-900">1,123</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-red-600 text-sm mt-2">↓ 3% vs mes anterior</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Alertas Activas</p>
              <h3 className="text-2xl font-bold text-gray-900">85</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-yellow-600 text-sm mt-2">↑ 8% vs mes anterior</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Incidentes por Mes</h3>
          <div className="h-[300px]">
            <Bar data={datosBarras} options={opcionesResponsivas} />
          </div>
        </div>

        {/* Gráfico de Línea */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendencia de Incidentes</h3>
          <div className="h-[300px]">
            <Line data={datosTendencia} options={opcionesResponsivas} />
          </div>
        </div>

        {/* Gráfico Circular */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Tipo</h3>
          <div className="h-[300px] max-w-[500px] mx-auto">
            <Doughnut data={datosTipo} options={opcionesResponsivas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasIncidentes;