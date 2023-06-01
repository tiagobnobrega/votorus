import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';
import * as process from 'process';
import {environmentValues, isEnvTireLte, zBooleanString, zNumber} from "./helpers";
import {EnvTierEnum, NodeEnvEnum} from "./environments";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(environmentValues as readonly [string, ...string[]]),
    HOST: z.string(),
    PORT: zNumber(),
    ERR_STACK_TRACE: zBooleanString(),
    LOG_PRETTY: zBooleanString(),
    LOG_LEVEL: z.enum(['fatal','error','warn','info','debug','trace']),
  },
  runtimeEnv: {
    NODE_ENV: NodeEnvEnum.PROD,
    ERR_STACK_TRACE: isEnvTireLte(EnvTierEnum.DEV, NodeEnvEnum.PROD).toString(),
    LOG_PRETTY: isEnvTireLte(EnvTierEnum.LOCAL, NodeEnvEnum.PROD).toString(),
    LOG_LEVEL: 'info',
    HOST: 'localhost',
    PORT: '3000',
    ...process.env,
  },
});
