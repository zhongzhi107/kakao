/**
 * 演示创建一个最简单的CRUD路由
 */

import Manager from '../models/manager';
import ResourceRouter from '../utils/router';

export default ResourceRouter.define(Manager.collection());
