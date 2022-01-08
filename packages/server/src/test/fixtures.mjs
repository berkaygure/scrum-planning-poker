import isCI from 'is-ci';
import dockerCompose from 'docker-compose';
import { execSync } from 'child_process';

export async function mochaGlobalSetup() {
  console.time('global-setup');

  await dockerCompose.upAll();
  execSync('yarn db:seed');

  console.timeEnd('global-setup');
}

export async function mochaGlobalTeardown() {
  if (isCI) {
    await dockerCompose.down();
  }
}
