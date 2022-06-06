import matchesRoutes from '@api/routes/matches';
import statRoutes from '@api/routes/statistics';
import reviewsRoutes from '@api/routes/reviews';

const routes = [...matchesRoutes, ...statRoutes, ...reviewsRoutes];

export default routes;