export async function act(fn: () => void): Promise<void> {
  fn()
  await Promise.resolve()
}
