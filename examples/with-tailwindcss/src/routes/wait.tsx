import { createResource } from 'solid-js';
import { Suspense } from 'solid-js/web';

import Counter from "~/components/Counter";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export default function Component() {
  return (
    <div class="p-20 gap-8 flex flex-col">
      <div>
        <Counter />
      </div>

      <SingleCreateResource />
      {/* <TwoCreateResources /> */}
      {/* <ManyCreateResources /> */}
    </div>
  );
}

const SingleCreateResource = () => {
  return (
    <div>
      <WaitWithSolidResource wait={3000}  />
    </div>
  )
}

const TwoCreateResources = () => {
  return (
    <div>
      <WaitWithSolidResource wait={500}  />
      <WaitWithSolidResource wait={600}  />
    </div>
  )
}

const ManyCreateResources = () => {
  return (
    <div>
      <WaitWithSolidResource wait={50} />
      <WaitWithSolidResource wait={100} />
      <WaitWithSolidResource wait={200} />
      <WaitWithSolidResource wait={300} />
      <WaitWithSolidResource wait={400} />
      <WaitWithSolidResource wait={500} />
      <WaitWithSolidResource wait={600} />
      <WaitWithSolidResource wait={1000} />
      <WaitWithSolidResource wait={2000} />
      <WaitWithSolidResource wait={4000} />
    </div>
  )
}

async function waitQuery(props: { wait: number; }) {
  console.log('running wait query..', props);

  await sleep(props.wait);

  return `waited ${props.wait}ms`;
}

function WaitWithSolidResource(props: { wait: number; deferStream?: boolean }) {
  const [data] = createResource(props, waitQuery, {
    deferStream: props.deferStream,
  });

  return (
    <Suspense fallback={<p>waiting {props.wait}...</p>}>
      <div>result: {data()}</div>
    </Suspense>
  );
}
