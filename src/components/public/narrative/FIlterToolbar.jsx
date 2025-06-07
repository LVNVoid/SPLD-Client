import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FilterToolbar({
  search,
  onSearchChange,
  authorFilter,
  onAuthorFilterChange,
  authors,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-2">
      <Input
        placeholder="Cari narasi..."
        className="w-full md:w-1/3"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      {/* Author Filter */}
      <Select value={authorFilter} onValueChange={onAuthorFilterChange}>
        <SelectTrigger className="w-full md:w-52">
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
    </div>
  );
}
