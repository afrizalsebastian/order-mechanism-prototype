import { Router } from 'express';
import { ExampleRoutes } from './example.routes';

export interface RouteName {
  name: string;
  router: Router;
}

const PreffixV1 = '/api/v1';
const routesV1: RouteName[] = [
  { name: `${PreffixV1}/example`, router: ExampleRoutes },
];

export { routesV1 };
