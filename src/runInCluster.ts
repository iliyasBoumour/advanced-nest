import * as _cluster from 'cluster';
import * as os from 'os';
const cluster = _cluster as unknown as _cluster.Cluster;
//  creates a child process for each core in our CPU
export function runInCluster(bootstrap: () => Promise<void>) {
  const numberOfCores = os.cpus().length;
  console.log(numberOfCores);

  if (cluster.isPrimary) {
    for (let i = 0; i < numberOfCores; ++i) {
      cluster.fork();
    }
  } else {
    bootstrap();
  }
}
