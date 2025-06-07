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
    <div className="flex  items-center justify-between gap-x-2">
      <div className="w-full">
        <Input
          placeholder="Cari narasi..."
          className="w-full md:w-64 "
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <Select value={authorFilter} onValueChange={onAuthorFilterChange}>
          <SelectTrigger className="w-full md:w-48 ">
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
    </div>
  );
}
