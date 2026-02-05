import { Table } from "antd";

export default function DataTable({
  data,
  selectedRow,
  onRowSelect,
  page,
  pageSize,
  total,
  onPageChange,
}) {
  const columns = [
    {
      title: "Project Name",
      dataIndex: "projectName",
      sorter: (a, b) => a.projectName.localeCompare(b.projectName),
    },
    {
      title: "Latitude",
      dataIndex: "latitude",
    },
    {
      title: "Longitude",
      dataIndex: "longitude",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
  ];

  const onShowSizeChange = (current, pageSize) => {
    console.log("Current page:", current, "Page size:", pageSize);
  };

  const getRowClass = (record) => {
    if (record.id === selectedRow) return "selected-row"; // selected row
    switch (record.status) {
      case "Active":
        return "row-active";
      case "Inactive":
        return "row-inactive";
      case "Completed":
        return "row-completed";
      default:
        return "";
    }
  };
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{
        current: page,
        pageSize,
        total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        defaultPageSize: 50,
        onShowSizeChange,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
        onChange: (p, ps) => onPageChange(p, ps),
      }}
      onRow={(record) => ({
        onClick: () => onRowSelect(record.id),
      })}
      // rowClassName={(record) =>
      //   record.id === selectedRow ? "selected-row" : ""
      // }
      rowClassName={getRowClass}
    />
  );
}
