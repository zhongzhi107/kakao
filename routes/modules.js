/**
 * 演示创建一个最简单的CRUD路由
 */

import Module from '../models/module';
import ResourceRouter from '../utils/router';

export default ResourceRouter.define(Module.collection());
