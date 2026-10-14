// Splits the airdrop's merkle-claims.json (written by the claim contract's deploy
// script) into public/claims/<first two hex characters of the address>.json, so the
// claim widget only downloads the slice for the connected wallet. Every proof is
// checked against CLAIM_MERKLE_ROOT first; nothing is written if any entry fails.
//
//   node scripts/build-claims.mjs /path/to/merkle-claims.json
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { concat, encodePacked, formatUnits, isAddress, keccak256 } from "viem";
import { CLAIM_MERKLE_ROOT, CLAIM_TOKEN_DECIMALS } from "../src/config/claim.js";

const source = process.argv[2];
if (!source) {
  console.error("Usage: node scripts/build-claims.mjs /path/to/merkle-claims.json");
  process.exit(1);
}

const outDir = fileURLToPath(new URL("../public/claims/", import.meta.url));
const root = CLAIM_MERKLE_ROOT.toLowerCase();

// Same check as OpenZeppelin's MerkleProof.verify in the contract: the leaf is
// keccak256(abi.encodePacked(account, amount)) and each pair is hashed in sorted order.
const verifyProof = (address, amount, proof) => {
  let node = keccak256(encodePacked(["address", "uint256"], [address, BigInt(amount)]));
  for (const sibling of proof) {
    node = keccak256(node < sibling ? concat([node, sibling]) : concat([sibling, node]));
  }
  return node === root;
};

const claims = JSON.parse(fs.readFileSync(source, "utf8"));
const chunks = {};
const problems = [];
let total = 0n;

claims.forEach((entry, i) => {
  const address = String(entry.address).toLowerCase();
  const amount = String(entry.amount);
  const proof = Array.isArray(entry.proof) ? entry.proof.map((p) => String(p).toLowerCase()) : [];
  const where = `row ${i} (${entry.address})`;

  if (!isAddress(address)) return problems.push(`${where}: invalid address`);
  if (!/^[1-9]\d*$/.test(amount)) return problems.push(`${where}: invalid amount ${amount}`);
  if (!proof.length || !proof.every((p) => /^0x[0-9a-f]{64}$/.test(p))) {
    return problems.push(`${where}: invalid proof`);
  }
  if (!verifyProof(address, amount, proof)) {
    return problems.push(`${where}: proof does not match the Merkle root`);
  }

  const prefix = address.slice(2, 4);
  chunks[prefix] ??= {};
  if (chunks[prefix][address]) return problems.push(`${where}: duplicate address`);
  chunks[prefix][address] = { amount, proof };
  total += BigInt(amount);
});

if (problems.length) {
  console.error(`Not writing claims, ${problems.length} problem(s):`);
  for (const problem of problems.slice(0, 20)) console.error(`  ${problem}`);
  process.exit(1);
}

// Write every prefix, empty ones as {}, so a lookup never depends on how the
// server answers a request for a missing file.
fs.mkdirSync(outDir, { recursive: true });
for (let n = 0; n < 256; n++) {
  const prefix = n.toString(16).padStart(2, "0");
  fs.writeFileSync(`${outDir}${prefix}.json`, `${JSON.stringify(chunks[prefix] ?? {})}\n`);
}

console.log(`Verified ${claims.length} claims against ${CLAIM_MERKLE_ROOT}`);
console.log(`Total: ${formatUnits(total, CLAIM_TOKEN_DECIMALS)} tokens`);
console.log("Wrote 256 files to public/claims/");
