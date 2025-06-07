import { Button } from "@/components/ui/button";

export function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Sebelumnya
      </Button>
      <span className="text-sm text-muted-foreground">
        Halaman {currentPage} dari {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={onNext}
      >
        Selanjutnya
      </Button>
    </div>
  );
}
