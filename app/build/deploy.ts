const target = process.argv[2]

if (!target) {
  console.error('❌ You must specify a target directory')
  process.exit(1)
}

// deploy do my ovh server
const cmd = [
  'scp',
  '-rp',
  '-P',
  '41556',
  '.output/public/.',
  `kvzbeoc@sshcloud.cluster024.hosting.ovh.net:./${target}`,
].join(' ')

console.log(`🚀 Deploying to "${target}"...`)

const { execaCommand } = await import('execa')
await execaCommand(cmd, { stdio: 'inherit' })
