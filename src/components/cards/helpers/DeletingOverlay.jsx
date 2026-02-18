import Loading from "../../Loading";

export default function DeletingOverlay({ isVisible }) {
    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] grid place-items-center z-10 animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-3">
                <Loading text="Deleting..." fullPage={false} />
            </div>
        </div>
    );
}
