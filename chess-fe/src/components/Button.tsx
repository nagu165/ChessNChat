

export const Button = ({ onClick, children }: {onClick: () => void, children: React.ReactNode }) => {
    return <button onClick={onClick} className="px-8 py-4 text-2xl bg-purple-500 hover:bg-purple-700 text-white font-bold rounded">
        {children}
    </button>
}