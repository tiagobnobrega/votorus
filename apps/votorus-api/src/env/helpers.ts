import process from "process";
import {z} from "zod";
import {EnvTierEnum, NodeEnvEnum} from "./environments";

export const environmentValues = [...Object.values(NodeEnvEnum)] as const;
export const NodeEnvEnumByValue = Object.entries(NodeEnvEnum).reduce(
  (acc, [k, v]) => {
    acc[v] = k;
    return acc;
  },
  {}
);
export function envTier(fallbackEnv?: string): number {
  const currEnv = process.env.NODE_ENV || fallbackEnv;
  const envKey = NodeEnvEnumByValue[currEnv];
  if (!envKey){
    if(NodeEnvEnumByValue[currEnv.toLowerCase()]){
      throw Error(`Unrecognized environment: "${process.env.NODE_ENV}". Did you mean "${currEnv.toLowerCase()}" ?`);
    }
    throw Error(`Unrecognized environment: "${process.env.NODE_ENV}"`);
  }

  const envTierVal = EnvTierEnum[envKey];
  if (typeof envTierVal === 'undefined')
    throw Error(`Could not find environment tier for: "${envKey}"`);
  return envTierVal;
}

export function isEnvTireLte(tier: number, fallbackEnv?: string) {
  return envTier(fallbackEnv) <= tier;
}

export function zBooleanString(){
  return z.string().transform((s) => s !== "false" && s !== "0")
}

export function zNumber(){
  return z.string().transform((s) => parseInt(s, 10)).pipe(z.number())
}
