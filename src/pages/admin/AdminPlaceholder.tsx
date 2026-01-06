export function AdminPlaceholder({ title }: { title: string }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-500 text-lg">페이지 준비중입니다.</p>
        </div>
    );
}
