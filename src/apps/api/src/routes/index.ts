import matchesRoutes from '@api/routes/matches';
import statRoutes from '@api/routes/statistics';

const routes = [...matchesRoutes, ...statRoutes];

export default routes;