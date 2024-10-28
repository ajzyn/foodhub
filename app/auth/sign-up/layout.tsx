export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Stwórz konto</h1>
      {children}
    </div>
  )
}
