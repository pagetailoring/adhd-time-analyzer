import { execa } from 'execa'

/**
 * Path to the `.env` file provided as the first CLI argument.
 * If no argument is provided, this will be `undefined` and
 * the underlying `dotenv` command will error out accordingly.
 * @type {string | undefined}
 */
const envPath = process.argv[2]

console.log(`🧪 Running tests with environment file: ${envPath}`)

/**
 * Executes the test suite under the specified environment.
 *
 * This function invokes the `dotenv` CLI to load environment variables
 * from the given file (`envPath`), then runs `vitest --run`.
 * Output streams (`stdout` and `stderr`) are inherited from the parent
 * process so that test logs appear in the console in real time.
 *
 * @async
 * @function run
 * @throws Will exit the process with code 1 if the test command fails.
 */
async function run() {
  try {
    await execa('dotenv', ['-e', envPath!, '--', 'vitest', '--run'], {
      stdio: 'inherit',
    })
    console.log('✅ Tests completed successfully.')
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Tests failed:', error.message)
    } else {
      console.error('❌ Tests failed with non-Error:', String(error))
    }
    process.exit(1)
  }
}

// Start the test run
run()
