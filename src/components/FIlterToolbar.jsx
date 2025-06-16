import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function FilterToolbar({
  search,
  onSearchChange,
  authorFilter,
  onAuthorFilterChange,
  authors,
  sortOrder,
  onSortOrderChange,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
      <Input
        placeholder="Cari narasi..."
        className="w-full md:w-64"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <div className="flex items-center gap-2">
        <Select value={authorFilter} onValueChange={onAuthorFilterChange}>
          <SelectTrigger className="w-full max-w-68">
            <SelectValue placeholder="Filter Penulis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Penulis</SelectItem>
            {authors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortOrder} onValueChange={onSortOrderChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Terbaru</SelectItem>
            <SelectItem value="asc">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
