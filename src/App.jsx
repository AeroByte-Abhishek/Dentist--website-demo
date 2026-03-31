import AppRoutes from './routes/AppRoutes';
import { useServiceWorkerSetup } from './hooks/useServiceWorkerSetup';

const App = () => {
  useServiceWorkerSetup();
  return <AppRoutes />;
};

export default App;
