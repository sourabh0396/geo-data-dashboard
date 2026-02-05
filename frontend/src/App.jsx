import { useState, useEffect, useMemo } from "react";
import { Layout, Typography, message } from "antd";
import SearchBar from "./components/SearchBar";
import DataTable from "./components/DataTable";
import Map from "./components/Map";

const { Content } = Layout;
const { Title } = Typography;

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const API_URL = "http://localhost:5000/api/geodata";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${API_URL}?search=${encodeURIComponent(search)}&page=${page}&limit=${pageSize}`,
        );
        if (!res.ok) throw new Error("Failed to fetch data from backend");
        const json = await res.json();
        setData(json.data);
        setTotal(json.pagination.total);
      } catch (error) {
        console.error(error);
        message.error("Unable to fetch data from backend");
      }
    };
    fetchData();
  }, [search, API_URL, page, pageSize]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: 16 }}>
        <Title level={3}>Geo Data Dashboard</Title>

        <SearchBar onSearch={setSearch} />

        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ width: "55%" }}>
            <DataTable
              data={data}
              selectedRow={selectedRow}
              onRowSelect={setSelectedRow}
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={(p, ps) => {
                setPage(p);
                setPageSize(ps);
              }}
            />
          </div>

          <div style={{ width: "45%", height: 500 }}>
            <Map
              data={data}
              selectedRow={selectedRow}
              onMarkerSelect={setSelectedRow}
            />
          </div>
        </div>
      </Content>
    </Layout>
  );
}
