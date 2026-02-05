import { getConnectSession } from '@/lib/auth/session'
import { ConnectFlow } from './connect-flow'

export async function ConnectFlowWrapper() {
  const session = await getConnectSession()

  return <ConnectFlow pendingConnection={session?.pendingConnection || null} />
}
