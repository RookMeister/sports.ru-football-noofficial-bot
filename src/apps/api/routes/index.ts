import matchesRoutes from '@api/routes/matches';
import statRoutes from '@api/routes/statistics';
import reviewsRoutes from '@api/routes/reviews';
import standingsRoutes from '@api/routes/standings';

const routes = [...matchesRoutes, ...statRoutes, ...reviewsRoutes, ...standingsRoutes];

export default routes;