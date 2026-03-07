import Link from "next/link";

export const metadata = {
  title: "Run a Node — Setara Network",
  description: "Guide to setting up a Setara validator node for your organization.",
};

function Code({ children }: { children: string }) {
  return (
    <div className="my-4 rounded-xl bg-[#1a1a2e] p-4 overflow-x-auto">
      <pre className="text-sm text-gray-300 leading-relaxed"><code>{children}</code></pre>
    </div>
  );
}

export default function RunNodePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <div className="mb-10">
          <Link href="/" className="text-sm text-[#E8613C] hover:underline">&larr; Back to Home</Link>
        </div>

        <h1 className="text-4xl font-bold text-[#1a1a2e]">Run a Setara Validator Node</h1>
        <p className="mt-4 text-lg text-gray-600">Set up a Setara validator node for your organization.</p>
        <hr className="my-8 border-gray-200" />

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Prerequisites</h2>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-6">
          <li>Docker and Docker Compose installed</li>
          <li>Server: 2 CPU, 4GB RAM, 100GB SSD minimum</li>
          <li>Stable internet connection</li>
          <li>A registered Setara organization (<Link href="/register" className="text-[#E8613C] hover:underline">register here</Link>)</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Quick Setup (Docker)</h2>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">1. Clone the Repository</h3>
        <Code>{`git clone https://github.com/setara-network/setara.git\ncd setara/docker`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">2. Configure Environment</h3>
        <Code>{`cp .env.example .env`}</Code>
        <p className="text-gray-700">Edit <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.env</code>:</p>
        <Code>{`MONIKER=your-org-name\nCHAIN_ID=setara-testnet-1\nPERSISTENT_PEERS=node_id@seed.setara.network:26656`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">3. Get Genesis File</h3>
        <p className="text-gray-700">For testnet:</p>
        <Code>{`curl -o genesis/genesis.json https://raw.githubusercontent.com/setara-network/networks/main/testnet/genesis.json`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">4. Start Your Node</h3>
        <Code>{`docker compose up -d`}</Code>
        <p className="text-gray-700">This starts:</p>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li><strong>setara-node</strong> — Your validator node (ports 26656, 26657, 1317, 9090)</li>
          <li><strong>setara-ipfs</strong> — Your IPFS node (ports 4001, 5001, 8080)</li>
          <li><strong>setara-api</strong> — API server connected to your node (port 8888)</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">5. Check Status</h3>
        <Code>{`# Check if node is syncing\ndocker logs setara-node --tail 20\n\n# Check block height\ncurl http://localhost:26657/status | jq '.result.sync_info.latest_block_height'`}</Code>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Ports</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-[#1a1a2e]">Port</th>
                <th className="px-4 py-3 font-semibold text-[#1a1a2e]">Service</th>
                <th className="px-4 py-3 font-semibold text-[#1a1a2e]">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-t"><td className="px-4 py-2 font-mono">26656</td><td className="px-4 py-2">P2P</td><td className="px-4 py-2">Peer-to-peer communication</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">26657</td><td className="px-4 py-2">RPC</td><td className="px-4 py-2">Tendermint RPC</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">1317</td><td className="px-4 py-2">REST</td><td className="px-4 py-2">Cosmos REST API</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">9090</td><td className="px-4 py-2">gRPC</td><td className="px-4 py-2">gRPC endpoint</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">4001</td><td className="px-4 py-2">IPFS Swarm</td><td className="px-4 py-2">IPFS peer communication</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">5001</td><td className="px-4 py-2">IPFS API</td><td className="px-4 py-2">IPFS HTTP API</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">8080</td><td className="px-4 py-2">IPFS Gateway</td><td className="px-4 py-2">IPFS public gateway</td></tr>
              <tr className="border-t"><td className="px-4 py-2 font-mono">8888</td><td className="px-4 py-2">Setara API</td><td className="px-4 py-2">Organization API</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Manual Setup (Without Docker)</h2>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">1. Build from Source</h3>
        <Code>{`git clone https://github.com/setara-network/setara.git\ncd setara\ngo build -o setarad ./cmd/setarad`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">2. Initialize</h3>
        <Code>{`setarad init "your-org-name" --chain-id setara-testnet-1 --default-denom setara`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">3. Configure Genesis</h3>
        <p className="text-gray-700">Copy the network genesis file to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.setara/config/genesis.json</code>.</p>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">4. Set Peers</h3>
        <p className="text-gray-700">Edit <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.setara/config/config.toml</code>:</p>
        <Code>{`persistent_peers = "node_id@seed.setara.network:26656"`}</Code>

        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">5. Start</h3>
        <Code>{`setarad start --minimum-gas-prices 0setara`}</Code>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Upgrading</h2>
        <Code>{`cd setara/docker\ndocker compose pull\ndocker compose up -d`}</Code>

        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-10">Troubleshooting</h2>
        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">Node not syncing</h3>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Check peers: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">curl http://localhost:26657/net_info | jq &apos;.result.n_peers&apos;</code></li>
          <li>Verify genesis file matches the network</li>
          <li>Ensure port 26656 is open</li>
        </ul>
        <h3 className="text-xl font-semibold text-[#1a1a2e] mt-8">IPFS not connecting</h3>
        <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-6">
          <li>Check: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">docker logs setara-ipfs</code></li>
          <li>Ensure port 4001 is accessible</li>
        </ul>
      </article>
    </div>
  );
}
