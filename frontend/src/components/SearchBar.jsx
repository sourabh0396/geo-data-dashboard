import { Input } from "antd";

export default function SearchBar({ onSearch }) {
  return (
    <Input.Search
      placeholder="Search project"
      allowClear
      onChange={(e) => onSearch(e.target.value)}
      style={{ marginBottom: 12 }}
    />
  );
}
