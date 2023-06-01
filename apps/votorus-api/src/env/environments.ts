export const NodeEnvEnum = {
  LOCAL: 'local',
  DEV: 'development',
  STAGING: 'staging',
  PROD: 'production',
} as const;
export type NodeEnvironmentEnum = typeof NodeEnvEnum;
export type NodeEnvironmentKey = keyof NodeEnvironmentEnum;

export const EnvTierEnum: Record<NodeEnvironmentKey, number> = {
  LOCAL: 1,
  DEV: 10,
  STAGING: 20,
  PROD: 30,
} as const;
