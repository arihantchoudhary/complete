import { motion } from 'framer-motion';
import { useTheme } from '../../utils/theme';
import SupplyChainMap from '../visualizations/SupplyChainMap';
import RiskScoreGauge from '../visualizations/RiskScoreGauge';
import RiskFactorsChart from '../visualizations/RiskFactorsChart';
import ShipmentTimeline from '../visualizations/ShipmentTimeline';
import { AlertTriangle, Package, Clock, MapPin } from 'lucide-react';

const alerts = [
  {
    type: 'warning',
    message: 'Increased naval activity in Red Sea region',
    timestamp: '2 hours ago',
  },
  {
    type: 'alert',
    message: 'Port congestion alert at Singapore harbor',
    timestamp: '5 hours ago',
  },
  {
    type: 'warning',
    message: 'Weather warning: Storm system approaching Mediterranean',
    timestamp: '1 day ago',
  },
];

export default function UseCaseSection() {
  const { isDarkMode } = useTheme();

  return (
    <section className="py-20 bg-dark-50 dark:bg-dark-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden"
          >
            <SupplyChainMap />
          </motion.div>

          {/* Risk Assessment Panel */}
          <div className="space-y-8">
            {/* Shipment Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-4">
                Shipment Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Origin</p>
                    <p className="font-medium text-dark-900 dark:text-dark-100">Singapore</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Destination</p>
                    <p className="font-medium text-dark-900 dark:text-dark-100">Rotterdam</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Product</p>
                    <p className="font-medium text-dark-900 dark:text-dark-100">Semiconductor Components</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-primary-600">$</span>
                  </div>
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Value</p>
                    <p className="font-medium text-dark-900 dark:text-dark-100">$750,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Estimated Transit Time</p>
                    <p className="font-medium text-dark-900 dark:text-dark-100">32 days</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Risk Score Gauge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 flex justify-center"
            >
              <RiskScoreGauge score={72} size={200} />
            </motion.div>

            {/* Risk Factors Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-4">
                Risk Factors
              </h3>
              <RiskFactorsChart />
            </motion.div>

            {/* Shipment Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-4">
                Journey Progress
              </h3>
              <ShipmentTimeline />
            </motion.div>

            {/* Live Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-dark-900 dark:text-dark-100 mb-4">
                Live Alerts
              </h3>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-dark-50 dark:bg-dark-700"
                  >
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-dark-900 dark:text-dark-100">
                        {alert.message}
                      </p>
                      <p className="text-xs text-dark-500 dark:text-dark-400">
                        {alert.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 