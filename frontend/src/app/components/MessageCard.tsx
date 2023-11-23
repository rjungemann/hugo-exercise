export const MessageCard = ({ message }: { message: string | undefined }) => (
  message
  ? (
    <div className="bg-slate-800 rounded-lg p-6 mb-6 text-white">
      <p>{message}</p>
    </div>
  )
  : (
    null
  )
)