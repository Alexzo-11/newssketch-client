export default function StatsCard({ icon: Icon, title, value, color = 'red' }) {
  const colorClasses = {
    red: 'bg-deepCrimson/10 text-deepCrimson',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const iconColor = colorClasses[color] || colorClasses.red;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-opensans">{title}</p>
          <p className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal dark:text-white">
            {value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}