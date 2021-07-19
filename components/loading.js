export function Loading() {
    return (
        <div
            className="flex overflow-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex-col justify-center items-center w-full h-screen opacity-75">
            <div className="mb-4 w-12 h-12 rounded-full border-4 border-t-4 border-blue-500 ease-linear loader"/>
            <h2 className="text-xl font-semibold text-center text-blue-600">Carregando...</h2>
        </div>
    )
}
